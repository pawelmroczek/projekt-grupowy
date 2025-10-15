package com.fashionassistant.services;

import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserPreferences;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.UserPreferencesRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPreferencesServiceImpl implements UserPreferencesService {
    private final AuthService authService;
    private final UserPreferencesRepository userPreferencesRepository;
    private final UserRepository userRepository;

    @Override
    public UserPreferences getUserPreferences() {
        User user = authService.getCurrentUser();
        int userPreferencesId = user.getUserPreferences().getId();
        UserPreferences userPreferences = userPreferencesRepository
                .findById(userPreferencesId).orElseThrow(() -> new NotFoundException("Preferences not found"));
        return userPreferences;
    }

    @Override
    public UserPreferences setUserPreferences(UserPreferences userPreferences) {
        User user = authService.getCurrentUser();
        user = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        userPreferences.setId(user.getUserPreferences().getId());
        user.setUserPreferences(userPreferences);
        userPreferences.setUser(user);
        userPreferencesRepository.save(userPreferences);
        return userPreferences;
    }
}
