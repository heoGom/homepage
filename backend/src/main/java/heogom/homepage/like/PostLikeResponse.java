package heogom.homepage.like;

import lombok.Getter;

public class PostLikeResponse {

    @Getter
    public static class ToggleDTO {

        private final Long postId;
        private final long likeCount;
        private final boolean liked;

        public ToggleDTO(Long postId, long likeCount, boolean liked) {
            this.postId = postId;
            this.likeCount = likeCount;
            this.liked = liked;
        }
    }
}
