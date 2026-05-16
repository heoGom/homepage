package heogom.homepage.like;

import lombok.Getter;

public class CommentLikeResponse {

    @Getter
    public static class ResultDTO {

        private final Long commentId;
        private final long likeCount;
        private final boolean liked;

        public ResultDTO(Long commentId, long likeCount, boolean liked) {
            this.commentId = commentId;
            this.likeCount = likeCount;
            this.liked = liked;
        }
    }
}
