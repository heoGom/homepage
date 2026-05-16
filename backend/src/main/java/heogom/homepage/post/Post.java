package heogom.homepage.post;

import heogom.homepage.common.entity.BaseEntity;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.security.OwnableResource;
import heogom.homepage.common.security.ResourceType;
import heogom.homepage.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="posts")
@Getter
@NoArgsConstructor
public class Post extends BaseEntity implements OwnableResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EntityStatus status = EntityStatus.ACTIVE;

    @Column(nullable = false)
    private long viewCount = 0;

    @Builder
    public Post(User user, String title, String content) {
        this.user = user;
        this.title = title;
        this.content = content;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void delete() {
        this.status = EntityStatus.DELETED;
    }

    public void increaseViewCount() {
        this.viewCount++;
    }

    @Override
    public ResourceType getResourceType() {
        return ResourceType.POST;
    }

    @Override
    public Long getResourceId() {
        return postId;
    }

    @Override
    public Long getOwnerUserId() {
        return user == null ? null : user.getUserId();
    }
}
