package com.fashionassistant.services;

import com.fashionassistant.entities.UserPreferences;
import com.fashionassistant.entities.UserPreferencesPut;

public interface UserPreferencesService {
    UserPreferences getUserPreferences();

    UserPreferences setUserPreferences(UserPreferencesPut userPreferences);
}
