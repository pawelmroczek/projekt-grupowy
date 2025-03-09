package com.fashionassistant.services;

import com.fashionassistant.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractEmail(String token);

    String generateToken(User user);

    boolean isTokenValid(String token, UserDetails userDetails);

}
