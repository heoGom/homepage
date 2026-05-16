package heogom.homepage.user;

import heogom.homepage.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    public MeResponse 나검증하기(Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();

        return MeResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole()).build();
    }
}
