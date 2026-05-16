package heogom.homepage.restaurant;

import heogom.homepage.common.entity.EntityStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RestaurantRepositoryTest {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Test
    void findRestaurants_withNullFiltersReturnsActiveRestaurants() {
        Page<Restaurant> result = restaurantRepository.findRestaurants(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                EntityStatus.DELETED,
                PageRequest.of(0, 100)
        );

        assertThat(result.getContent())
                .extracting(Restaurant::getName)
                .contains("Choryang Milmyeon", "Sinbalwon");
    }

    @Test
    void findRestaurants_withFiltersReturnsMatchedRestaurants() {
        Page<Restaurant> result = restaurantRepository.findRestaurants(
                RestaurantArea.BUSAN_STATION,
                RestaurantCategory.NOODLES,
                OrderDifficulty.EASY,
                EnglishLevel.BASIC,
                SoloFriendly.YES,
                SpicyLevel.MILD,
                TouristFriendly.HIGH,
                VeganOption.NONE,
                EntityStatus.DELETED,
                PageRequest.of(0, 10)
        );

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Choryang Milmyeon");
        assertThat(result.getContent().get(0).getVeganOption()).isEqualTo(VeganOption.NONE);
    }

    @Test
    void findRestaurants_withVeganOptionFilterReturnsMatchedRestaurants() {
        Page<Restaurant> result = restaurantRepository.findRestaurants(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                VeganOption.LIMITED,
                EntityStatus.DELETED,
                PageRequest.of(0, 10)
        );

        assertThat(result.getContent())
                .extracting(Restaurant::getVeganOption)
                .containsOnly(VeganOption.LIMITED);
    }
}
