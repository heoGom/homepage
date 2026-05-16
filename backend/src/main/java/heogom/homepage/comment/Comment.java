package heogom.homepage.comment;

import heogom.homepage.common.entity.BaseEntity;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.security.OwnableResource;
import heogom.homepage.common.security.ResourceType;
import heogom.homepage.post.Post;
import heogom.homepage.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments")
@Getter
@NoArgsConstructor
public class Comment extends BaseEntity implements OwnableResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String content;

    @Column
    private Long parentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EntityStatus status = EntityStatus.ACTIVE;

    @Builder
    public Comment(Post post, User user, String content, Long parentId) {
        this.post = post;
        this.user = user;
        this.content = content;
        this.parentId = parentId;
    }

    public boolean isReply() {
        return parentId != null;
    }

    public void update(String content) {
        this.content = content;
    }

    public void delete() {
        this.status = EntityStatus.DELETED;
    }

    @Override
    public ResourceType getResourceType() {
        return ResourceType.COMMENT;
    }

    @Override
    public Long getResourceId() {
        return commentId;
    }

    @Override
    public Long getOwnerUserId() {
        return user == null ? null : user.getUserId();
    }
}
