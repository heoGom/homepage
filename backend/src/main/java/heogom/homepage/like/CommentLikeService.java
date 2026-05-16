package heogom.homepage.like;

import heogom.homepage.comment.Comment;
import heogom.homepage.comment.CommentRepository;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public CommentLikeResponse.ResultDTO toggle(Long commentId, User user) {
        Comment comment = getActiveComment(commentId);

        boolean liked = commentLikeRepository.findByCommentAndUser(comment, user)
                .map(commentLike -> {
                    commentLikeRepository.delete(commentLike);
                    return false;
                })
                .orElseGet(() -> {
                    commentLikeRepository.save(new CommentLike(comment, user));
                    return true;
                });

        long likeCount = countByCommentId(commentId);
        return new CommentLikeResponse.ResultDTO(commentId, likeCount, liked);
    }

    public CommentLikeResponse.ResultDTO getStatus(Long commentId, User user) {
        getActiveComment(commentId);

        long likeCount = countByCommentId(commentId);
        boolean liked = isLiked(commentId, user.getUserId());
        return new CommentLikeResponse.ResultDTO(commentId, likeCount, liked);
    }

    public long countByCommentId(Long commentId) {
        return commentLikeRepository.countByCommentCommentId(commentId);
    }

    public boolean isLiked(Long commentId, Long userId) {
        return commentLikeRepository.existsByCommentCommentIdAndUserUserId(commentId, userId);
    }

    private Comment getActiveComment(Long commentId) {
        return commentRepository.findActiveById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));
    }
}
