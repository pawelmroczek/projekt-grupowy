package com.fashionassistant.rest;

import com.fashionassistant.entities.UserPreferences;
import com.fashionassistant.entities.UserPreferencesGet;
import com.fashionassistant.services.UserPreferencesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("fashion/user-preferences")
@RequiredArgsConstructor
public class UserPreferencesController {
    private final UserPreferencesService userPreferencesService;

    @GetMapping
    public UserPreferencesGet getUserPreferences() {
        return new UserPreferencesGet(userPreferencesService.getUserPreferences());
    }

    @PutMapping
    public UserPreferencesGet updateUserPreferences(@RequestBody UserPreferences userPreferences) {
        return new UserPreferencesGet(userPreferencesService.setUserPreferences(userPreferences));
    }
}
