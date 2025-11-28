package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.services.AuthService;
import com.fashionassistant.services.UserService;
import com.fashionassistant.services.AvatarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("fashion/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    private final AvatarService avatarService;

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
                <head>
                    <meta charset="UTF-8">
                    <title>Weryfikacja konta</title>
                </head>
                <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                    <h1>Twoje konto zostało pomyślnie zweryfikowane!</h1>
                    <p>Możesz zalogować się do Fashion Buddy.</p>
                </body>
            </html>
        """;
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/html; charset=UTF-8"))
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

    @GetMapping("/avatar")
    public ResponseEntity<UserAvatarGet> getCurrentUserWithAvatar() {
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(new UserAvatarGet(currentUser));
    }

    @PostMapping("/avatar")
    public ResponseEntity<UserAvatarGet> uploadAvatar(@RequestParam("file") MultipartFile file) {
        avatarService.saveAvatar(file);
        User currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(new UserAvatarGet(currentUser));
    }

    @DeleteMapping("/avatar")
    public ResponseEntity<String> deleteAvatar() {
        avatarService.deleteCurrentUserAvatar();
        return ResponseEntity.ok("Avatar deleted successfully");
    }
}
