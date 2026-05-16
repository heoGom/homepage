package heogom.homepage.user;

import heogom.homepage.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/users/me")
    public ApiResponse<MeResponse> me(Authentication authentication) {
        return ApiResponse.ok(userService.나검증하기(authentication));

    }
}
