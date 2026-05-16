package heogom.homepage.post;

import heogom.homepage.common.entity.EntityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByPostIdAndStatusNot(Long postId, EntityStatus status);

    @Query(value = """
            select
                p as post,
                (select count(c) from Comment c where c.post = p and c.status <> :deletedStatus) as commentCount,
                (select count(c) from Comment c where c.post = p and c.status <> :deletedStatus and c.parentId is null) as topLevelCommentCount,
                (select count(pl) from PostLike pl where pl.post = p) as likeCount,
                (select count(vl) from PostLike vl where vl.post = p and vl.user.userId = :userId) as likedCount
            from Post p
            where p.status <> :deletedStatus
              and (:keyword is null or :keyword = '' or p.title like concat('%', :keyword, '%'))
            order by
                case when :sort = 'latest' and :direction = 'asc' then p.postId end asc,
                case when :sort = 'latest' and :direction = 'desc' then p.postId end desc,
                case when :sort = 'likes' and :direction = 'asc' then (select count(pl) from PostLike pl where pl.post = p) end asc,
                case when :sort = 'likes' and :direction = 'desc' then (select count(pl) from PostLike pl where pl.post = p) end desc,
                case when :sort = 'comments' and :direction = 'asc' then (select count(c) from Comment c where c.post = p and c.status <> :deletedStatus) end asc,
                case when :sort = 'comments' and :direction = 'desc' then (select count(c) from Comment c where c.post = p and c.status <> :deletedStatus) end desc,
                case when :sort = 'views' and :direction = 'asc' then p.viewCount end asc,
                case when :sort = 'views' and :direction = 'desc' then p.viewCount end desc,
                p.postId desc
            """,
            countQuery = """
                    select count(p)
                    from Post p
                    where p.status <> :deletedStatus
                      and (:keyword is null or :keyword = '' or p.title like concat('%', :keyword, '%'))
                    """)
    Page<PostListRow> findPostListRows(
            @Param("keyword") String keyword,
            @Param("deletedStatus") EntityStatus deletedStatus,
            @Param("userId") Long userId,
            @Param("sort") String sort,
            @Param("direction") String direction,
            Pageable pageable
    );

    List<Post> findTop10ByTitleContainingAndStatusNot(String keyword, EntityStatus status);

    default Optional<Post> findActiveById(Long postId) {
        return findByPostIdAndStatusNot(postId, EntityStatus.DELETED);
    }
}
