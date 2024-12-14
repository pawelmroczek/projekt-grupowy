package com.fashionassistant.rest;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserAuth;
import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.services.AuthService;
import com.fashionassistant.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fashion/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/signIn")
    public Token signIn(@RequestBody UserAuth user) {
        return authService.logIn(user);
    }

    @PostMapping("/signUp")
    public User signUp(@RequestBody UserCreate user) {
        return userService.signUp(user);
    }
}
