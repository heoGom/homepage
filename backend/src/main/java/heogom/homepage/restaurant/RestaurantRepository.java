package heogom.homepage.restaurant;

import heogom.homepage.common.entity.EntityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByRestaurantIdAndStatus(Long restaurantId, EntityStatus status);

    @Query("""
            select r
            from Restaurant r
            where r.status <> :deletedStatus
              and (:area is null or r.area = :area)
              and (:category is null or r.category = :category)
              and (:orderDifficulty is null or r.orderDifficulty = :orderDifficulty)
              and (:englishLevel is null or r.englishLevel = :englishLevel)
              and (:soloFriendly is null or r.soloFriendly = :soloFriendly)
              and (:spicyLevel is null or r.spicyLevel = :spicyLevel)
              and (:touristFriendly is null or r.touristFriendly = :touristFriendly)
              and (:veganOption is null or r.veganOption = :veganOption)
            order by r.restaurantId desc
            """)
    Page<Restaurant> findRestaurants(
            @Param("area") RestaurantArea area,
            @Param("category") RestaurantCategory category,
            @Param("orderDifficulty") OrderDifficulty orderDifficulty,
            @Param("englishLevel") EnglishLevel englishLevel,
            @Param("soloFriendly") SoloFriendly soloFriendly,
            @Param("spicyLevel") SpicyLevel spicyLevel,
            @Param("touristFriendly") TouristFriendly touristFriendly,
            @Param("veganOption") VeganOption veganOption,
            @Param("deletedStatus") EntityStatus deletedStatus,
            Pageable pageable
    );

    default Optional<Restaurant> findActiveById(Long restaurantId) {
        return findByRestaurantIdAndStatus(restaurantId, EntityStatus.ACTIVE);
    }
}
