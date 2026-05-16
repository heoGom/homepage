package heogom.homepage.like;

import heogom.homepage.comment.Comment;
import heogom.homepage.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);

    long countByCommentCommentId(Long commentId);

    boolean existsByCommentCommentIdAndUserUserId(Long commentId, Long userId);
}
