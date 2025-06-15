package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    @Override
    public Token signUp(UserCreate userCreate) {
        throwIfUserExists(userCreate);
        User user = new User(
                0,
                userCreate.username(),
                userCreate.email(),
                passwordEncoder.encode(userCreate.password()),
                new ArrayList<Clothes>(),
                new HashSet<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>()
        );
        userRepository.save(user);
        return authService.logIn(new UserAuth(userCreate.email(), userCreate.password()));
    }

    @Override
    public List<UserFriendGet> getUsersByUsername(String username) {
        int currentUserId = authService.getCurrentUser().getId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        Set<User> userFriends = currentUser.getFriends();
        List<Invitation> sentInvitations = currentUser.getSentInvitations();
        List<Invitation> receivedInvitations = currentUser.getReceivedInvitations();
        List<Invitation> invitations = Stream.concat(sentInvitations.stream(), receivedInvitations.stream()).toList();
        List<User> users = userRepository.findAllByUsername(username)
                .orElseThrow(() -> new NotFoundException("User with this username not found"));
        List<UserFriendGet> usersGet = new ArrayList<>();
        users.forEach(user -> {
            if (userFriends.contains(user) || currentUser.getId() == user.getId()) {
                return;
            }
            long invitationsCount = invitations.stream()
                    .filter(invitation ->
                            (invitation.getToUser().equals(currentUser) && invitation.getFromUser().equals(user)) ||
                                    (invitation.getToUser().equals(user) && invitation.getFromUser().equals(currentUser))
                    ).count();
            if (invitationsCount != 0) {
                return;
            }
            usersGet.add(new UserFriendGet(user.getId(), user.getUsername()));
        });
        return usersGet;
    }

    private void throwIfUserExists(UserCreate userCreate) {
        if (userRepository.existsByEmail(userCreate.email())) {
            throw new BadRequestException("User with this email already exists");
        }
    }
}
