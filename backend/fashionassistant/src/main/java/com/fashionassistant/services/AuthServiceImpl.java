package com.fashionassistant.services;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserAuth;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Override
    public Token logIn(UserAuth userAuth) {
        User user = userRepository.findByEmail(userAuth.email())
                .orElseThrow(() -> new BadRequestException("User not found"));
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userAuth.email(), userAuth.password()
                    )
            );
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return new Token(jwtService.generateToken(user));
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }
}
