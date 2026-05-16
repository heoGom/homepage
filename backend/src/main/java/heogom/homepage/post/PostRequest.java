package heogom.homepage.post;

import heogom.homepage.user.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class PostRequest {

    @Data
    public static class SaveDTO {

        @NotBlank
        private String title;
        @NotBlank
        private String content;

        public Post toEntity(User user) {
            return Post.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .build();
        }
    }
    @Data

    public static class UpdateDTO {

        @NotBlank
        private String title;

        @NotBlank
        private String content;

    }

}
