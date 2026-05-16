package heogom.homepage.post;

import heogom.homepage.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_view_histories")
@Getter
@NoArgsConstructor
public class PostViewHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long viewHistoryId;

    @Column(nullable = false)
    private Long postId;

    @Column
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ViewerType viewerType;

    @Column(length = 100)
    private String ipAddress;

    @Column(length = 500)
    private String userAgent;

    public static PostViewHistory loggedIn(Long postId, Long userId, String ipAddress, String userAgent) {
        PostViewHistory history = new PostViewHistory();
        history.postId = postId;
        history.userId = userId;
        history.viewerType = ViewerType.AUTHENTICATED;
        history.ipAddress = ipAddress;
        history.userAgent = userAgent;
        return history;
    }
}
