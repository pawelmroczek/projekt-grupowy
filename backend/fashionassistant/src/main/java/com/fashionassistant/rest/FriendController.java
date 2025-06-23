package com.fashionassistant.rest;

import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.services.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
