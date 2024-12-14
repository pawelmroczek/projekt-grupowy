package com.fashionassistant.services;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserAuth;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Override
    public Token logIn(UserAuth userAuth) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userAuth.email(), userAuth.password()
                )
        );
        User user = userRepository.findByEmail(userAuth.email()).orElseThrow(() -> new RuntimeException());
        return new Token(jwtService.generateToken(user));
    }
}
