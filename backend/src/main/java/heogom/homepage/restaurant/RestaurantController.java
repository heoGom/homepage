package heogom.homepage.restaurant;

import heogom.homepage.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping
    public ApiResponse<RestaurantResponse.DetailDTO> save(@Valid @RequestBody RestaurantRequest.SaveDTO request) {
        return ApiResponse.ok(restaurantService.저장하기(request));
    }

    @GetMapping
    public ApiResponse<RestaurantResponse.PageDTO> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) RestaurantArea area,
            @RequestParam(required = false) RestaurantCategory category,
            @RequestParam(required = false) OrderDifficulty orderDifficulty,
            @RequestParam(required = false) EnglishLevel englishLevel,
            @RequestParam(required = false) SoloFriendly soloFriendly,
            @RequestParam(required = false) SpicyLevel spicyLevel,
            @RequestParam(required = false) TouristFriendly touristFriendly,
            @RequestParam(required = false) VeganOption veganOption
    ) {
        return ApiResponse.ok(restaurantService.전체조회하기(
                page,
                size,
                area,
                category,
                orderDifficulty,
                englishLevel,
                soloFriendly,
                spicyLevel,
                touristFriendly,
                veganOption
        ));
    }

    @GetMapping("/{restaurantId}")
    public ApiResponse<RestaurantDetailResponse> findById(@PathVariable Long restaurantId) {
        return ApiResponse.ok(restaurantService.상세조회하기(restaurantId));
    }
}
