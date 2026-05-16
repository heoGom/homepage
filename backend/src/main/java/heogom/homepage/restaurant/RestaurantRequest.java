package heogom.homepage.restaurant;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class RestaurantRequest {

    @Data
    public static class SaveDTO {

        @NotBlank
        private String name;

        @NotNull
        private RestaurantArea area;

        @NotNull
        private RestaurantCategory category;

        @NotBlank
        private String address;

        private String description;

        private String imageUrl;

        private String mapUrl;

        private Double latitude;

        private Double longitude;

        private String recommendedMenu;

        private String orderTip;

        private String warningNote;

        @NotNull
        private OrderDifficulty orderDifficulty;

        @NotNull
        private EnglishLevel englishLevel;

        @NotNull
        private SoloFriendly soloFriendly;

        @NotNull
        private SpicyLevel spicyLevel;

        @NotNull
        private TouristFriendly touristFriendly;

        private VeganOption veganOption;

        public Restaurant toEntity() {
            return Restaurant.builder()
                    .name(name)
                    .area(area)
                    .category(category)
                    .address(address)
                    .description(description)
                    .imageUrl(imageUrl)
                    .mapUrl(mapUrl)
                    .latitude(latitude)
                    .longitude(longitude)
                    .recommendedMenu(recommendedMenu)
                    .orderTip(orderTip)
                    .warningNote(warningNote)
                    .orderDifficulty(orderDifficulty)
                    .englishLevel(englishLevel)
                    .soloFriendly(soloFriendly)
                    .spicyLevel(spicyLevel)
                    .touristFriendly(touristFriendly)
                    .veganOption(veganOption == null ? VeganOption.NONE : veganOption)
                    .build();
        }
    }
}
