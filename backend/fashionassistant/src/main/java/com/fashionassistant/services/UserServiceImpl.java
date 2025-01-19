package com.fashionassistant.services;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User signUp(UserCreate userCreate) {
        throwIfUserExists(userCreate);
        User user = new User(
                0,
                userCreate.username(),
                userCreate.email(),
                passwordEncoder.encode(userCreate.password()),
                new ArrayList<Clothes>()
        );
        return userRepository.save(user);
    }

    private void throwIfUserExists(UserCreate userCreate) {
        if (userRepository.existsByEmail(userCreate.email())) {
            throw new BadRequestException("User with this email already exists");
        }
    }
}
