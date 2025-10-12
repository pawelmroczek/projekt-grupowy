package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
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
    public UserFriendGet signUp(@RequestBody UserCreate user) {
        return userService.signUp(user);
    }

    @GetMapping("/{username}")
    public List<UserFriendGet> getUsersByUsername(@PathVariable String username) {
        return userService.getUsersByUsername(username);
    }

    @GetMapping("/verify/{token}")
    public void verify(@PathVariable String token) {
        userService.verify(token);
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordRequest password) {
        userService.changePassword(password);
    }

    @PostMapping("/reset-password/{email}")
    public void resetPassword(@PathVariable String email) {
        userService.resetPassword(email);
    }
}
