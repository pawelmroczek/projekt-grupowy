package com.fashionassistant.services;

import com.fashionassistant.entities.UserPreferences;

public interface UserPreferencesService {
    UserPreferences getUserPreferences();

    UserPreferences setUserPreferences(UserPreferences userPreferences);
}
