package com.fashionassistant.services;

import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserFriendGet;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {
    private final AuthService authService;
    private final UserRepository userRepository;

    @Override
    public List<UserFriendGet> getAllFriends() {
        User currentUser = authService.getCurrentUser();
        currentUser = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        Set<User> friends = currentUser.getFriends();
        List<UserFriendGet> friendsGet = friends.stream()
                .map(friend -> new UserFriendGet(friend.getId(), friend.getUsername()))
                .toList();
        return friendsGet;
    }
}
