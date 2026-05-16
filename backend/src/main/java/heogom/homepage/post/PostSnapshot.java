package heogom.homepage.post;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostSnapshot {

    private Long postId;
    private Long userId;
    private String title;
    private String content;
    private String status;
    private long viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostSnapshot from(Post post) {
        PostSnapshot snapshot = new PostSnapshot();
        snapshot.postId = post.getPostId();
        snapshot.userId = post.getUser().getUserId();
        snapshot.title = post.getTitle();
        snapshot.content = post.getContent();
        snapshot.status = post.getStatus().name();
        snapshot.viewCount = post.getViewCount();
        snapshot.createdAt = post.getCreatedAt();
        snapshot.updatedAt = post.getUpdatedAt();
        return snapshot;
    }
}
