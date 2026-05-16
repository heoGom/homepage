package heogom.homepage.jwt;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtUtilTest {

    private static final String TEST_SECRET =
            "test-jwt-secret-for-hs512-that-is-longer-than-sixty-four-bytes-total";

    @Test
    void createAndValidateToken_usesConfiguredHs512Secret() {
        JwtUtil jwtUtil = new JwtUtil(TEST_SECRET);

        String token = jwtUtil.createToken("test@test.com");

        assertThat(jwtUtil.validateToken(token)).isEqualTo("test@test.com");
    }

    @Test
    void shortSecret_throwsExceptionForHs512() {
        assertThatThrownBy(() -> new JwtUtil("short-secret"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("jwt.secret");
    }

    @Test
    void missingSecret_throwsException() {
        assertThatThrownBy(() -> new JwtUtil(null))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("jwt.secret");
    }
}
