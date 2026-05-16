package heogom.homepage.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MeResponse {
    private String email;
    private String nickname;
    private String role;

}
