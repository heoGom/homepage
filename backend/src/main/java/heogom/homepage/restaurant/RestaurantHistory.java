package heogom.homepage.restaurant;

import heogom.homepage.common.entity.BaseEntity;
import heogom.homepage.common.history.AuditAction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "restaurant_histories")
@Getter
@NoArgsConstructor
public class RestaurantHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @Column(nullable = false)
    private Long targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AuditAction action;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String beforeData;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String afterData;

    public static RestaurantHistory of(Long targetId, AuditAction action, String beforeData, String afterData) {
        RestaurantHistory history = new RestaurantHistory();
        history.targetId = targetId;
        history.action = action;
        history.beforeData = beforeData;
        history.afterData = afterData;
        return history;
    }
}
