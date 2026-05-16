package heogom.homepage.restaurant;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public class RestaurantResponse {

    @Getter
    public static class DetailDTO {

        private Long restaurantId;
        private String name;
        private String area;
        private String category;
        private String address;
        private String description;
        private String imageUrl;
        private Double latitude;
        private Double longitude;
        private String recommendedMenu;
        private String orderDifficulty;
        private String englishLevel;
        private String soloFriendly;
        private String spicyLevel;
        private String touristFriendly;
        private String veganOption;
        private String status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DetailDTO(Restaurant restaurant) {
            this.restaurantId = restaurant.getRestaurantId();
            this.name = restaurant.getName();
            this.area = restaurant.getArea().name();
            this.category = restaurant.getCategory().name();
            this.address = restaurant.getAddress();
            this.description = restaurant.getDescription();
            this.imageUrl = restaurant.getImageUrl();
            this.latitude = restaurant.getLatitude();
            this.longitude = restaurant.getLongitude();
            this.recommendedMenu = restaurant.getRecommendedMenu();
            this.orderDifficulty = restaurant.getOrderDifficulty().name();
            this.englishLevel = restaurant.getEnglishLevel().name();
            this.soloFriendly = restaurant.getSoloFriendly().name();
            this.spicyLevel = restaurant.getSpicyLevel().name();
            this.touristFriendly = restaurant.getTouristFriendly().name();
            this.veganOption = restaurant.getVeganOption().name();
            this.status = restaurant.getStatus().name();
            this.createdAt = restaurant.getCreatedAt();
            this.updatedAt = restaurant.getUpdatedAt();
        }
    }

    @Getter
    public static class PageDTO {

        private List<DetailDTO> restaurants;
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private boolean first;
        private boolean last;

        public PageDTO(Page<Restaurant> pageResult) {
            this.restaurants = pageResult.getContent()
                    .stream()
                    .map(DetailDTO::new)
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
