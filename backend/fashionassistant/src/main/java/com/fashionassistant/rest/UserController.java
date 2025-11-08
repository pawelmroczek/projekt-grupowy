package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.services.AuthService;
import com.fashionassistant.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/info")
    public UserGet getUserInfo() {
        return new UserGet(userService.getUserInfo());
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<String> verify(@PathVariable String token) {
        userService.verify(token);
        String successHtml = """
            <html>
                <head><title>Account Verified</title></head>
                <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                    <h1>Your account has been successfully activated!</h1>
                    <p>You can now log in to Fashion Buddy.</p>
                </body>
            </html>
        """;
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(successHtml);
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
