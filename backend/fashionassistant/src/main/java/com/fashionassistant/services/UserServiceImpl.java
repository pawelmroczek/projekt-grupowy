package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.UserRepository;
import com.fashionassistant.repositories.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final EmailService emailService;

    @Override
    public UserFriendGet signUp(UserCreate userCreate) {
        throwIfUserExists(userCreate);
        User user = new User(
                0,
                userCreate.username(),
                userCreate.email(),
                passwordEncoder.encode(userCreate.password()),
                false,
                new ArrayList<Clothes>(),
                new ArrayList<Outfit>(),
                new HashSet<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>()
        );
        User createdUser = userRepository.save(user);
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken =
                new VerificationToken(0, token, LocalDateTime.now().plusHours(24), user);
        verificationTokenRepository.save(verificationToken);
        String verificationUrl = "http://localhost:8080/fashion/users/verify/" + token;
        emailService.sendVerificationEmail(user.getEmail(),
                "Fashion Buddy email verification",
                "Click link to activate your account: " + verificationUrl);
        return new UserFriendGet(createdUser.getId(), createdUser.getUsername());
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

    @Override
    public void verify(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new NotFoundException("Verification token not found"));
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Token is expired");
        }
        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
    }

    private void throwIfUserExists(UserCreate userCreate) {
        if (userRepository.existsByEmail(userCreate.email())) {
            throw new BadRequestException("User with this email already exists");
        }
    }
}
