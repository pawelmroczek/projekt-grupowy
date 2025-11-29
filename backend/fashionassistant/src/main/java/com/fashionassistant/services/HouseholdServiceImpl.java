package com.fashionassistant.services;

import com.fashionassistant.entities.Household;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.HouseholdRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HouseholdServiceImpl implements HouseholdService {
    private final HouseholdRepository householdRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    @Override
    public List<UserFriendGet> getUsersFromHousehold() {
        User currentUser = authService.getCurrentUser();
        Household household = householdRepository.findById(currentUser.getHousehold().getId())
                .orElseThrow(() -> new NotFoundException("Household not found"));
        List<UserFriendGet> usersFromHousehold = household.getUsers().stream()
                .map(user -> new UserFriendGet(user.getId(), user.getUsername(),
                        user.getAvatar() != null ? user.getAvatar().getUrl() : null))
                .toList();
        return usersFromHousehold;
    }

    @Override
    public void leaveHousehold() {
        User user = authService.getCurrentUser();
        user = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        Household household = householdRepository.findById(user.getHousehold().getId())
                .orElseThrow(() -> new NotFoundException("Household not found"));
        household.getUsers().remove(user);
        user.setHousehold(null);
        userRepository.save(user);
    }
}
