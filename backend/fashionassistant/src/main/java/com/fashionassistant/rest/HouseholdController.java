package com.fashionassistant.rest;

import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.services.HouseholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("fashion/household")
@RequiredArgsConstructor
public class HouseholdController {
    private final HouseholdService householdService;

    @GetMapping
    public List<UserFriendGet> getUsersFromHousehold() {
        return householdService.getUsersFromHousehold();
    }

    @PostMapping("/leave")
    public void leaveHousehold() {
        householdService.leaveHousehold();
    }
}
