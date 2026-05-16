package heogom.homepage.post;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public class PostResponse {

    @Getter
    public static class DetailDTO {

        private Long postId;
        private String title;
        private String content;
        private String email;
        private String nickname;
        private String status;
        private long likeCount;
        private boolean liked;
        private long commentCount;
        private long topLevelCommentCount;
        private long viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DetailDTO(Post post) {
            this(post, 0, false);
        }

        public DetailDTO(Post post, long likeCount, boolean liked) {
            this(post, likeCount, liked, 0, 0);
        }

        public DetailDTO(Post post, long likeCount, boolean liked, long commentCount, long topLevelCommentCount) {
            this.postId = post.getPostId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.email = post.getUser().getEmail();
            this.nickname = post.getUser().getNickname();
            this.status = post.getStatus().name();
            this.likeCount = likeCount;
            this.liked = liked;
            this.commentCount = commentCount;
            this.topLevelCommentCount = topLevelCommentCount;
            this.viewCount = post.getViewCount();
            this.createdAt = post.getCreatedAt();
            this.updatedAt = post.getUpdatedAt();
        }
    }
    @Getter

    public static class PageDTO {

        private List<DetailDTO> posts;
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private boolean first;
        private boolean last;

        public PageDTO(Page<PostListRow> pageResult) {
            this.posts = pageResult.getContent()
                    .stream()
                    .map(row -> new DetailDTO(
                            row.getPost(),
                            row.getLikeCount(),
                            row.getLikedCount() > 0,
                            row.getCommentCount(),
                            row.getTopLevelCommentCount()
                    ))
                    .toList();
            this.page = pageResult.getNumber();
            this.size = pageResult.getSize();
            this.totalElements = pageResult.getTotalElements();
            this.totalPages = pageResult.getTotalPages();
            this.first = pageResult.isFirst();
            this.last = pageResult.isLast();
        }
    }
}
