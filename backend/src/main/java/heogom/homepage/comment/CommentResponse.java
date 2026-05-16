package heogom.homepage.comment;

import heogom.homepage.common.entity.EntityStatus;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CommentResponse {

    @Getter
    public static class DetailDTO {

        private Long commentId;
        private Long parentId;
        private String content;
        private String email;
        private String nickname;
        private boolean deleted;
        private long likeCount;
        private boolean liked;
        private List<DetailDTO> replies = new ArrayList<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DetailDTO(Comment comment) {
            this(comment, 0, false);
        }

        public DetailDTO(Comment comment, long likeCount, boolean liked) {
            this.commentId = comment.getCommentId();
            this.parentId = comment.getParentId();
            this.email = comment.getUser().getEmail();
            this.nickname = comment.getUser().getNickname();
            this.deleted = comment.getStatus() == EntityStatus.DELETED;
            this.content = deleted ? "삭제된 댓글입니다" : comment.getContent();
            this.likeCount = likeCount;
            this.liked = liked;
            this.createdAt = comment.getCreatedAt();
            this.updatedAt = comment.getUpdatedAt();
        }

        public void addReply(DetailDTO reply) {
            this.replies.add(reply);
        }
    }
}
