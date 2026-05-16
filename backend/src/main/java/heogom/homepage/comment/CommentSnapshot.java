package heogom.homepage.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentSnapshot {

    private Long commentId;
    private Long postId;
    private Long userId;
    private String content;
    private Long parentId;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CommentSnapshot from(Comment comment) {
        CommentSnapshot snapshot = new CommentSnapshot();
        snapshot.commentId = comment.getCommentId();
        snapshot.postId = comment.getPost().getPostId();
        snapshot.userId = comment.getUser().getUserId();
        snapshot.content = comment.getContent();
        snapshot.parentId = comment.getParentId();
        snapshot.status = comment.getStatus().name();
        snapshot.createdAt = comment.getCreatedAt();
        snapshot.updatedAt = comment.getUpdatedAt();
        return snapshot;
    }
}
