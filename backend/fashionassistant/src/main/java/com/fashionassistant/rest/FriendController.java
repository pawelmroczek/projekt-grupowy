package com.fashionassistant.rest;

import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.services.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fashion/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping
    public List<UserFriendGet> getAllFriends() {
        return friendService.getAllFriends();
    }

    @DeleteMapping("/{friendId}")
    public void removeFriend(@PathVariable int friendId) {
        friendService.removeFriend(friendId);
    }
}
