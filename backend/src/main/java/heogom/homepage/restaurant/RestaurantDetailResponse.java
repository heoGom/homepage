package heogom.homepage.restaurant;

import lombok.Getter;

@Getter
public class RestaurantDetailResponse {

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

    public RestaurantDetailResponse(Restaurant restaurant) {
        this.restaurantId = restaurant.getRestaurantId();
        this.name = restaurant.getName();
        this.area = restaurant.getArea().name();
        this.category = restaurant.getCategory().name();
        this.address = restaurant.getAddress();
        this.description = restaurant.getDescription();
        this.imageUrl = restaurant.getImageUrl();
        this.mapUrl = restaurant.getMapUrl();
        this.latitude = restaurant.getLatitude();
        this.longitude = restaurant.getLongitude();
        this.recommendedMenu = restaurant.getRecommendedMenu();
        this.orderTip = restaurant.getOrderTip();
        this.warningNote = restaurant.getWarningNote();
        this.orderDifficulty = restaurant.getOrderDifficulty().name();
        this.englishLevel = restaurant.getEnglishLevel().name();
        this.soloFriendly = restaurant.getSoloFriendly().name();
        this.spicyLevel = restaurant.getSpicyLevel().name();
        this.touristFriendly = restaurant.getTouristFriendly().name();
        this.veganOption = restaurant.getVeganOption().name();
    }
}
