package heogom.homepage;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = {
        "spring.profiles.active=prod",
        "DB_URL=jdbc:h2:mem:prod-profile-load;MODE=MySQL;DB_CLOSE_DELAY=-1",
        "DB_USERNAME=sa",
        "DB_PASSWORD=",
        "JPA_DDL_AUTO=create-drop",
        "JWT_SECRET=homepage-prod-profile-test-secret-for-hs512-that-is-longer-than-sixty-four-bytes",
        "spring.datasource.driver-class-name=org.h2.Driver"
})
class ProdProfileContextLoadTest {

    @Autowired
    private Environment environment;

    @Test
    void prodProfileLoadsWithExternalizedDatabaseProperties() {
        assertThat(environment.getProperty("spring.datasource.url"))
                .isEqualTo("jdbc:h2:mem:prod-profile-load;MODE=MySQL;DB_CLOSE_DELAY=-1");
        assertThat(environment.getProperty("spring.datasource.username")).isEqualTo("sa");
        assertThat(environment.getProperty("spring.jpa.hibernate.ddl-auto")).isEqualTo("create-drop");
        assertThat(environment.getProperty("jwt.secret"))
                .isEqualTo("homepage-prod-profile-test-secret-for-hs512-that-is-longer-than-sixty-four-bytes");
    }
}
