package heogom.homepage.restaurant;

import com.fasterxml.jackson.databind.SerializationFeature;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RestaurantServiceTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private RestaurantHistoryRepository restaurantHistoryRepository;

    private RestaurantService restaurantService;

    @BeforeEach
    void setUp() {
        restaurantService = new RestaurantService(
                restaurantRepository,
                restaurantHistoryRepository,
                Jackson2ObjectMapperBuilder.json()
                        .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                        .build()
        );
    }

    @Test
    void save_createsRestaurantAndHistory() {
        RestaurantRequest.SaveDTO request = saveRequest();
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantRepository.saveAndFlush(any(Restaurant.class))).thenReturn(restaurant);

        RestaurantResponse.DetailDTO response = restaurantService.저장하기(request);

        assertThat(response.getRestaurantId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("명동교자");
        assertThat(response.getOrderDifficulty()).isEqualTo(OrderDifficulty.EASY.name());
        assertThat(response.getVeganOption()).isEqualTo(VeganOption.FRIENDLY.name());
        verify(restaurantRepository).saveAndFlush(any(Restaurant.class));

        ArgumentCaptor<RestaurantHistory> historyCaptor = ArgumentCaptor.forClass(RestaurantHistory.class);
        verify(restaurantHistoryRepository).save(historyCaptor.capture());
        RestaurantHistory history = historyCaptor.getValue();
        assertThat(history.getTargetId()).isEqualTo(1L);
        assertThat(history.getBeforeData()).isNull();
        assertThat(history.getAfterData()).contains(
                "\"restaurantId\":1",
                "\"imageUrl\":\"https://placehold.co/800x500?text=Restaurant\"",
                "\"latitude\":35.1",
                "\"longitude\":129.1",
                "\"recommendedMenu\":\"Kalguksu set\"",
                "\"orderDifficulty\":\"EASY\"",
                "\"englishLevel\":\"BASIC\"",
                "\"veganOption\":\"FRIENDLY\"",
                "\"createdAt\":\"2026-05-05T12:00:00\"",
                "\"updatedAt\":\"2026-05-05T12:30:00\""
        );
    }

    @Test
    void save_whenVeganOptionMissingDefaultsToNone() {
        RestaurantRequest.SaveDTO request = saveRequest();
        request.setVeganOption(null);
        when(restaurantRepository.saveAndFlush(any(Restaurant.class)))
                .thenAnswer(invocation -> {
                    Restaurant restaurant = invocation.getArgument(0);
                    ReflectionTestUtils.setField(restaurant, "restaurantId", 2L);
                    ReflectionTestUtils.setField(restaurant, "createdAt", LocalDateTime.of(2026, 5, 5, 12, 0));
                    ReflectionTestUtils.setField(restaurant, "updatedAt", LocalDateTime.of(2026, 5, 5, 12, 30));
                    return restaurant;
                });

        RestaurantResponse.DetailDTO response = restaurantService.저장하기(request);

        assertThat(response.getVeganOption()).isEqualTo(VeganOption.NONE.name());
    }

    @Test
    void findAll_usesFiltersAndReturnsPage() {
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantRepository.findRestaurants(
                eq(RestaurantArea.HAEUNDAE),
                eq(RestaurantCategory.SEAFOOD),
                eq(OrderDifficulty.EASY),
                eq(EnglishLevel.BASIC),
                eq(SoloFriendly.OK),
                eq(SpicyLevel.NOT_SPICY),
                eq(TouristFriendly.HIGH),
                eq(VeganOption.FRIENDLY),
                eq(EntityStatus.DELETED),
                any(Pageable.class)
        )).thenReturn(new PageImpl<>(List.of(restaurant)));

        RestaurantResponse.PageDTO response = restaurantService.전체조회하기(
                0,
                10,
                RestaurantArea.HAEUNDAE,
                RestaurantCategory.SEAFOOD,
                OrderDifficulty.EASY,
                EnglishLevel.BASIC,
                SoloFriendly.OK,
                SpicyLevel.NOT_SPICY,
                TouristFriendly.HIGH,
                VeganOption.FRIENDLY
        );

        assertThat(response.getRestaurants()).hasSize(1);
        assertThat(response.getRestaurants().get(0).getName()).isEqualTo("명동교자");
    }

    @Test
    void findById_whenNotFoundThrowsBusinessException() {
        when(restaurantRepository.findActiveById(404L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> restaurantService.상세조회하기(404L))
                .isInstanceOf(BusinessException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.RESTAURANT_NOT_FOUND);
    }

    @Test
    void findById_returnsDetailResponse() {
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantRepository.findActiveById(1L)).thenReturn(Optional.of(restaurant));

        RestaurantDetailResponse response = restaurantService.상세조회하기(1L);

        assertThat(response.getRestaurantId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("명동교자");
        assertThat(response.getArea()).isEqualTo(RestaurantArea.HAEUNDAE.name());
        assertThat(response.getCategory()).isEqualTo(RestaurantCategory.SEAFOOD.name());
        assertThat(response.getAddress()).isEqualTo("서울 중구 명동10길 29");
        assertThat(response.getImageUrl()).isEqualTo("https://placehold.co/800x500?text=Restaurant");
        assertThat(response.getMapUrl()).contains("google.com/maps/search");
        assertThat(response.getLatitude()).isEqualTo(35.1);
        assertThat(response.getLongitude()).isEqualTo(129.1);
        assertThat(response.getRecommendedMenu()).isEqualTo("Kalguksu set");
        assertThat(response.getOrderTip()).isEqualTo("Use the picture menu and order at the counter.");
        assertThat(response.getWarningNote()).isEqualTo("Peak meal times can have a short wait.");
        assertThat(response.getVeganOption()).isEqualTo(VeganOption.FRIENDLY.name());
    }

    private RestaurantRequest.SaveDTO saveRequest() {
        RestaurantRequest.SaveDTO request = new RestaurantRequest.SaveDTO();
        request.setName("명동교자");
        request.setArea(RestaurantArea.HAEUNDAE);
        request.setCategory(RestaurantCategory.SEAFOOD);
        request.setAddress("서울 중구 명동10길 29");
        request.setDescription("외국인도 주문하기 쉬운 대표 칼국수 식당");
        request.setLatitude(35.1);
        request.setLongitude(129.1);
        request.setOrderDifficulty(OrderDifficulty.EASY);
        request.setEnglishLevel(EnglishLevel.BASIC);
        request.setSoloFriendly(SoloFriendly.OK);
        request.setSpicyLevel(SpicyLevel.NOT_SPICY);
        request.setTouristFriendly(TouristFriendly.HIGH);
        request.setVeganOption(VeganOption.FRIENDLY);
        return request;
    }

    private Restaurant sampleRestaurant(Long restaurantId, String name, RestaurantArea area, RestaurantCategory category) {
        Restaurant restaurant = Restaurant.builder()
                .name(name)
                .area(area)
                .category(category)
                .address("서울 중구 명동10길 29")
                .description("외국인도 주문하기 쉬운 대표 식당")
                .imageUrl("https://placehold.co/800x500?text=Restaurant")
                .mapUrl("https://www.google.com/maps/search/?api=1&query=Myeongdong%20Kyoja")
                .latitude(35.1)
                .longitude(129.1)
                .recommendedMenu("Kalguksu set")
                .orderTip("Use the picture menu and order at the counter.")
                .warningNote("Peak meal times can have a short wait.")
                .orderDifficulty(OrderDifficulty.EASY)
                .englishLevel(EnglishLevel.BASIC)
                .soloFriendly(SoloFriendly.OK)
                .spicyLevel(SpicyLevel.NOT_SPICY)
                .touristFriendly(TouristFriendly.HIGH)
                .veganOption(VeganOption.FRIENDLY)
                .build();
        ReflectionTestUtils.setField(restaurant, "restaurantId", restaurantId);
        ReflectionTestUtils.setField(restaurant, "createdAt", LocalDateTime.of(2026, 5, 5, 12, 0));
        ReflectionTestUtils.setField(restaurant, "updatedAt", LocalDateTime.of(2026, 5, 5, 12, 30));
        return restaurant;
    }
}
