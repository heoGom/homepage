package heogom.homepage.restaurant;

import heogom.homepage.common.entity.BaseEntity;
import heogom.homepage.common.entity.EntityStatus;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "restaurants")
@Getter
@NoArgsConstructor
public class Restaurant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantId;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RestaurantArea area;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RestaurantCategory category;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(length = 1000)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 500)
    private String mapUrl;

    private Double latitude;

    private Double longitude;

    @Column(length = 255)
    private String recommendedMenu;

    @Column(length = 1000)
    private String orderTip;

    @Column(length = 1000)
    private String warningNote;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderDifficulty orderDifficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EnglishLevel englishLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SoloFriendly soloFriendly;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SpicyLevel spicyLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TouristFriendly touristFriendly;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VeganOption veganOption = VeganOption.NONE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EntityStatus status = EntityStatus.ACTIVE;

    @Builder
    public Restaurant(String name, RestaurantArea area, RestaurantCategory category, String address, String description,
                      String imageUrl, String mapUrl, Double latitude, Double longitude,
                      String recommendedMenu, String orderTip, String warningNote,
                      OrderDifficulty orderDifficulty, EnglishLevel englishLevel, SoloFriendly soloFriendly,
                      SpicyLevel spicyLevel, TouristFriendly touristFriendly, VeganOption veganOption) {
        this.name = name;
        this.area = area;
        this.category = category;
        this.address = address;
        this.description = description;
        this.imageUrl = imageUrl;
        this.mapUrl = mapUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.recommendedMenu = recommendedMenu;
        this.orderTip = orderTip;
        this.warningNote = warningNote;
        this.orderDifficulty = orderDifficulty;
        this.englishLevel = englishLevel;
        this.soloFriendly = soloFriendly;
        this.spicyLevel = spicyLevel;
        this.touristFriendly = touristFriendly;
        this.veganOption = veganOption == null ? VeganOption.NONE : veganOption;
    }
}
