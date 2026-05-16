package heogom.homepage.comment;

import heogom.homepage.post.Post;
import heogom.homepage.user.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class CommentRequest {

    @Data
    public static class SaveDTO {

        @NotBlank
        private String content;

        private Long parentId;

        public Comment toEntity(Post post, User user) {
            return Comment.builder()
                    .post(post)
                    .user(user)
                    .content(content)
                    .parentId(parentId)
                    .build();
        }
    }

    @Data
    public static class UpdateDTO {

        @NotBlank
        private String content;
    }
}
