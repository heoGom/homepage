package heogom.homepage.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;


public class JwtUtil {

    public static final int HS512_MIN_SECRET_BYTES = 64;
    private static final long TOKEN_VALIDITY_MILLIS = 1000 * 60 * 60;

    private final Key secretKey;

    public JwtUtil(String secret) {
        this.secretKey = createSigningKey(secret);
    }

    public String createToken(String username) {
        return createToken(username, new Date(System.currentTimeMillis() + TOKEN_VALIDITY_MILLIS));
    }

    public String createToken(String username, Date expiration) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expiration)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String validateToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();

    }

    private Key createSigningKey(String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("jwt.secret property is required.");
        }

        byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (secretBytes.length < HS512_MIN_SECRET_BYTES) {
            throw new IllegalStateException("jwt.secret must be at least 64 bytes for HS512.");
        }
        return Keys.hmacShaKeyFor(secretBytes);
    }
}
