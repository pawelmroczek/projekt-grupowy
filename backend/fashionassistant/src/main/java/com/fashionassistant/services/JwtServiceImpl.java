package com.fashionassistant.services;

import com.fashionassistant.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${jwt.key}")
    private String key;
    @Value("${jwt.expiration.time}")
    private long jwtExpirationTime;

    @Override
    public String extractEmail(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private String generateToken(Map<String, Object> claims, User user) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationTime))
                .signWith(getSignToKey())
                .compact();
    }

    @Override
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return generateToken(claims, user);
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignToKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignToKey() {
        byte[] keyBytes = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
