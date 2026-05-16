package heogom.homepage.comment;

import heogom.homepage.common.entity.EntityStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByCommentIdAndStatusNot(Long commentId, EntityStatus status);

    List<Comment> findByPostPostIdOrderByCommentIdAsc(Long postId);

    long countByPostPostIdAndStatusNot(Long postId, EntityStatus status);

    long countByPostPostIdAndParentIdIsNullAndStatusNot(Long postId, EntityStatus status);

    default Optional<Comment> findActiveById(Long commentId) {
        return findByCommentIdAndStatusNot(commentId, EntityStatus.DELETED);
    }
}
