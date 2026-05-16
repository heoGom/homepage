package heogom.homepage.restaurant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.common.history.AuditAction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantHistoryRepository restaurantHistoryRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public RestaurantResponse.DetailDTO 저장하기(RestaurantRequest.SaveDTO request) {
        Restaurant savedRestaurant = restaurantRepository.saveAndFlush(request.toEntity());
        restaurantHistoryRepository.save(RestaurantHistory.of(
                savedRestaurant.getRestaurantId(),
                AuditAction.CREATE,
                null,
                toJson(RestaurantSnapshot.from(savedRestaurant))
        ));

        return new RestaurantResponse.DetailDTO(savedRestaurant);
    }

    @Transactional(readOnly = true)
    public RestaurantResponse.PageDTO 전체조회하기(
            int page,
            int size,
            RestaurantArea area,
            RestaurantCategory category,
            OrderDifficulty orderDifficulty,
            EnglishLevel englishLevel,
            SoloFriendly soloFriendly,
            SpicyLevel spicyLevel,
            TouristFriendly touristFriendly,
            VeganOption veganOption
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Restaurant> pageResult = restaurantRepository.findRestaurants(
                area,
                category,
                orderDifficulty,
                englishLevel,
                soloFriendly,
                spicyLevel,
                touristFriendly,
                veganOption,
                EntityStatus.DELETED,
                pageable
        );

        return new RestaurantResponse.PageDTO(pageResult);
    }

    @Transactional(readOnly = true)
    public RestaurantDetailResponse 상세조회하기(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findActiveById(restaurantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESTAURANT_NOT_FOUND));

        return new RestaurantDetailResponse(restaurant);
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("이력 데이터 직렬화 실패", e);
        }
    }
}
