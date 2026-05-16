package heogom.homepage.post;

import heogom.homepage.common.history.AuditAction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_histories")
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class PostHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @Column(nullable = false)
    private Long targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AuditAction action;

    @Column(nullable = false)
    private Long userId;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String beforeData;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String afterData;

    public static PostHistory of(Long targetId, Long userId, AuditAction action, String beforeData, String afterData) {
        PostHistory history = new PostHistory();
        history.targetId = targetId;
        history.userId = userId;
        history.action = action;
        history.beforeData = beforeData;
        history.afterData = afterData;
        return history;
    }
}
