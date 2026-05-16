package heogom.homepage;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class HomepageApplicationTests {

    @Autowired
    private Environment environment;

    @Test
    void contextLoads() {
        assertThat(environment.getProperty("jwt.secret"))
                .isEqualTo("homepage-local-test-jwt-secret-for-hs512-that-is-longer-than-sixty-four-bytes");
    }

}
