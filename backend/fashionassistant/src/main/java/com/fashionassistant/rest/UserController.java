package com.fashionassistant.rest;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.UserAuth;
import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.services.AuthService;
import com.fashionassistant.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Token signUp(@RequestBody UserCreate user) {
        return userService.signUp(user);
    }

    @GetMapping("/{username}")
    public List<UserFriendGet> getUsersByUsername(@PathVariable String username) {
        return userService.getUsersByUsername(username);
    }
}
