package heogom.homepage.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

import static org.assertj.core.api.Assertions.assertThat;

class JwtConfigTest {

    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
            .withUserConfiguration(JwtConfig.class);

    @Test
    void jwtUtil_usesInjectedJwtSecretProperty() {
        contextRunner
                .withPropertyValues("jwt.secret=homepage-jwt-config-test-secret-for-hs512-that-is-longer-than-sixty-four-bytes")
                .run(context -> assertThat(context).hasSingleBean(JwtUtil.class));
    }

    @Test
    void missingJwtSecretProperty_failsContextStartup() {
        contextRunner.run(context -> {
            assertThat(context).hasFailed();
            assertThat(context.getStartupFailure()).hasMessageContaining("jwt.secret");
        });
    }
}
