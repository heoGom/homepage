package heogom.homepage.like;

import heogom.homepage.post.Post;
import heogom.homepage.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByPostAndUser(Post post, User user);

    long countByPostPostId(Long postId);

    boolean existsByPostPostIdAndUserUserId(Long postId, Long userId);
}
