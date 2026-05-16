package heogom.homepage.restaurant;

import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RestaurantControllerMockMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestaurantService restaurantService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void createRestaurant_returnsApiResponseWithoutJwt() throws Exception {
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantService.저장하기(any(RestaurantRequest.SaveDTO.class)))
                .thenReturn(new RestaurantResponse.DetailDTO(restaurant));

        mockMvc.perform(post("/api/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "명동교자",
                                  "area": "HAEUNDAE",
                                  "category": "SEAFOOD",
                                  "address": "서울 중구 명동10길 29",
                                  "description": "외국인도 주문하기 쉬운 대표 칼국수 식당",
                                  "imageUrl": "https://placehold.co/800x500?text=Restaurant",
                                  "mapUrl": "https://www.google.com/maps/search/?api=1&query=Myeongdong%20Kyoja",
                                  "latitude": 35.1,
                                  "longitude": 129.1,
                                  "recommendedMenu": "Kalguksu set",
                                  "orderTip": "Use the picture menu and order at the counter.",
                                  "warningNote": "Peak meal times can have a short wait.",
                                  "orderDifficulty": "EASY",
                                  "englishLevel": "BASIC",
                                  "soloFriendly": "OK",
                                  "spicyLevel": "NOT_SPICY",
                                  "touristFriendly": "HIGH",
                                  "veganOption": "FRIENDLY"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.restaurantId").value(1L))
                .andExpect(jsonPath("$.data.name").value("명동교자"))
                .andExpect(jsonPath("$.data.latitude").value(35.1))
                .andExpect(jsonPath("$.data.longitude").value(129.1))
                .andExpect(jsonPath("$.data.orderDifficulty").value("EASY"))
                .andExpect(jsonPath("$.data.veganOption").value("FRIENDLY"))
                .andExpect(jsonPath("$.message").value(nullValue()));

        verify(restaurantService).저장하기(any(RestaurantRequest.SaveDTO.class));
    }

    @Test
    void getRestaurants_returnsFilteredApiResponseWithoutJwt() throws Exception {
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantService.전체조회하기(
                anyInt(),
                anyInt(),
                eq(RestaurantArea.HAEUNDAE),
                eq(RestaurantCategory.SEAFOOD),
                eq(OrderDifficulty.EASY),
                eq(EnglishLevel.BASIC),
                eq(SoloFriendly.OK),
                eq(SpicyLevel.NOT_SPICY),
                eq(TouristFriendly.HIGH),
                eq(VeganOption.FRIENDLY)
        )).thenReturn(new RestaurantResponse.PageDTO(new PageImpl<>(List.of(restaurant))));

        mockMvc.perform(get("/api/restaurants")
                        .param("page", "0")
                        .param("size", "10")
                        .param("area", "HAEUNDAE")
                        .param("category", "SEAFOOD")
                        .param("orderDifficulty", "EASY")
                        .param("englishLevel", "BASIC")
                        .param("soloFriendly", "OK")
                        .param("spicyLevel", "NOT_SPICY")
                        .param("touristFriendly", "HIGH")
                        .param("veganOption", "FRIENDLY"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.restaurants[0].restaurantId").value(1L))
                .andExpect(jsonPath("$.data.restaurants[0].name").value("명동교자"))
                .andExpect(jsonPath("$.data.restaurants[0].imageUrl").value("https://placehold.co/800x500?text=Restaurant"))
                .andExpect(jsonPath("$.data.restaurants[0].latitude").value(35.1))
                .andExpect(jsonPath("$.data.restaurants[0].longitude").value(129.1))
                .andExpect(jsonPath("$.data.restaurants[0].recommendedMenu").value("Kalguksu set"))
                .andExpect(jsonPath("$.data.restaurants[0].veganOption").value("FRIENDLY"))
                .andExpect(jsonPath("$.data.totalElements").value(1L))
                .andExpect(jsonPath("$.message").value(nullValue()));

        verify(restaurantService).전체조회하기(
                eq(0),
                eq(10),
                eq(RestaurantArea.HAEUNDAE),
                eq(RestaurantCategory.SEAFOOD),
                eq(OrderDifficulty.EASY),
                eq(EnglishLevel.BASIC),
                eq(SoloFriendly.OK),
                eq(SpicyLevel.NOT_SPICY),
                eq(TouristFriendly.HIGH),
                eq(VeganOption.FRIENDLY)
        );
    }

    @Test
    void createRestaurant_withoutVeganOptionReturnsNone() throws Exception {
        Restaurant restaurant = sampleRestaurant(1L, "기본 비건", RestaurantArea.HAEUNDAE, RestaurantCategory.KOREAN_SOUP, VeganOption.NONE);
        when(restaurantService.저장하기(any(RestaurantRequest.SaveDTO.class)))
                .thenReturn(new RestaurantResponse.DetailDTO(restaurant));

        mockMvc.perform(post("/api/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "기본 비건",
                                  "area": "HAEUNDAE",
                                  "category": "KOREAN_SOUP",
                                  "address": "서울 중구 명동길 1",
                                  "description": "비건 옵션 누락 테스트",
                                  "orderDifficulty": "EASY",
                                  "englishLevel": "BASIC",
                                  "soloFriendly": "OK",
                                  "spicyLevel": "NOT_SPICY",
                                  "touristFriendly": "HIGH"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.veganOption").value("NONE"));
    }

    @Test
    void getRestaurant_whenNotFoundReturns404() throws Exception {
        when(restaurantService.상세조회하기(404L))
                .thenThrow(new BusinessException(ErrorCode.RESTAURANT_NOT_FOUND));

        mockMvc.perform(get("/api/restaurants/404"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.RESTAURANT_NOT_FOUND.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.RESTAURANT_NOT_FOUND.getMessage()));
    }

    @Test
    void getRestaurant_returnsDetailApiResponseWithoutJwt() throws Exception {
        Restaurant restaurant = sampleRestaurant(1L, "명동교자", RestaurantArea.HAEUNDAE, RestaurantCategory.SEAFOOD);
        when(restaurantService.상세조회하기(1L))
                .thenReturn(new RestaurantDetailResponse(restaurant));

        mockMvc.perform(get("/api/restaurants/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.restaurantId").value(1L))
                .andExpect(jsonPath("$.data.name").value("명동교자"))
                .andExpect(jsonPath("$.data.area").value("HAEUNDAE"))
                .andExpect(jsonPath("$.data.category").value("SEAFOOD"))
                .andExpect(jsonPath("$.data.address").value("서울 중구 명동10길 29"))
                .andExpect(jsonPath("$.data.imageUrl").value("https://placehold.co/800x500?text=Restaurant"))
                .andExpect(jsonPath("$.data.mapUrl").value("https://www.google.com/maps/search/?api=1&query=Myeongdong%20Kyoja"))
                .andExpect(jsonPath("$.data.latitude").value(35.1))
                .andExpect(jsonPath("$.data.longitude").value(129.1))
                .andExpect(jsonPath("$.data.recommendedMenu").value("Kalguksu set"))
                .andExpect(jsonPath("$.data.orderTip").value("Use the picture menu and order at the counter."))
                .andExpect(jsonPath("$.data.warningNote").value("Peak meal times can have a short wait."))
                .andExpect(jsonPath("$.data.orderDifficulty").value("EASY"))
                .andExpect(jsonPath("$.data.englishLevel").value("BASIC"))
                .andExpect(jsonPath("$.data.soloFriendly").value("OK"))
                .andExpect(jsonPath("$.data.spicyLevel").value("NOT_SPICY"))
                .andExpect(jsonPath("$.data.touristFriendly").value("HIGH"))
                .andExpect(jsonPath("$.data.veganOption").value("FRIENDLY"))
                .andExpect(jsonPath("$.data.status").doesNotExist())
                .andExpect(jsonPath("$.data.createdAt").doesNotExist())
                .andExpect(jsonPath("$.message").value(nullValue()));

        verify(restaurantService).상세조회하기(1L);
    }

    @Test
    void createRestaurant_validationFailure_returnsInvalidRequest() throws Exception {
        mockMvc.perform(post("/api/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "",
                                  "area": "",
                                  "category": "",
                                  "address": "",
                                  "orderDifficulty": null,
                                  "englishLevel": null,
                                  "soloFriendly": null,
                                  "spicyLevel": null,
                                  "touristFriendly": null
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void getRestaurants_invalidEnumFilter_returnsInvalidRequest() throws Exception {
        mockMvc.perform(get("/api/restaurants")
                        .param("orderDifficulty", "WRONG"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void getRestaurants_invalidAreaFilter_returnsInvalidRequest() throws Exception {
        mockMvc.perform(get("/api/restaurants")
                        .param("area", "WRONG"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void getRestaurants_invalidCategoryFilter_returnsInvalidRequest() throws Exception {
        mockMvc.perform(get("/api/restaurants")
                        .param("category", "WRONG"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void getRestaurants_invalidVeganOptionFilter_returnsInvalidRequest() throws Exception {
        mockMvc.perform(get("/api/restaurants")
                        .param("veganOption", "WRONG"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void putRestaurant_isNotOpenedByPermitAll() throws Exception {
        mockMvc.perform(put("/api/restaurants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "수정"
                                }
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.AUTHENTICATION_FAILED.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.AUTHENTICATION_FAILED.getMessage()));
    }

    private Restaurant sampleRestaurant(Long restaurantId, String name, RestaurantArea area, RestaurantCategory category) {
        return sampleRestaurant(restaurantId, name, area, category, VeganOption.FRIENDLY);
    }

    private Restaurant sampleRestaurant(Long restaurantId, String name, RestaurantArea area, RestaurantCategory category,
                                        VeganOption veganOption) {
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
                .veganOption(veganOption)
                .build();
        ReflectionTestUtils.setField(restaurant, "restaurantId", restaurantId);
        ReflectionTestUtils.setField(restaurant, "createdAt", LocalDateTime.of(2026, 5, 5, 12, 0));
        ReflectionTestUtils.setField(restaurant, "updatedAt", LocalDateTime.of(2026, 5, 5, 12, 30));
        return restaurant;
    }
}
