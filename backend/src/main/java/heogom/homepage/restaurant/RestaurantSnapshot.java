package heogom.homepage.restaurant;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class RestaurantSnapshot {

    private Long restaurantId;
    private String name;
    private String area;
    private String category;
    private String address;
    private String description;
    private String imageUrl;
    private String mapUrl;
    private Double latitude;
    private Double longitude;
    private String recommendedMenu;
    private String orderTip;
    private String warningNote;
    private String orderDifficulty;
    private String englishLevel;
    private String soloFriendly;
    private String spicyLevel;
    private String touristFriendly;
    private String veganOption;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RestaurantSnapshot from(Restaurant restaurant) {
        return RestaurantSnapshot.builder()
                .restaurantId(restaurant.getRestaurantId())
                .name(restaurant.getName())
                .area(restaurant.getArea().name())
                .category(restaurant.getCategory().name())
                .address(restaurant.getAddress())
                .description(restaurant.getDescription())
                .imageUrl(restaurant.getImageUrl())
                .mapUrl(restaurant.getMapUrl())
                .latitude(restaurant.getLatitude())
                .longitude(restaurant.getLongitude())
                .recommendedMenu(restaurant.getRecommendedMenu())
                .orderTip(restaurant.getOrderTip())
                .warningNote(restaurant.getWarningNote())
                .orderDifficulty(restaurant.getOrderDifficulty().name())
                .englishLevel(restaurant.getEnglishLevel().name())
                .soloFriendly(restaurant.getSoloFriendly().name())
                .spicyLevel(restaurant.getSpicyLevel().name())
                .touristFriendly(restaurant.getTouristFriendly().name())
                .veganOption(restaurant.getVeganOption().name())
                .status(restaurant.getStatus().name())
                .createdAt(restaurant.getCreatedAt())
                .updatedAt(restaurant.getUpdatedAt())
                .build();
    }
}
