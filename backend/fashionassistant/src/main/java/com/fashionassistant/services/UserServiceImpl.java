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
        UserPreferences userPreferences = new UserPreferences(
                0,
                1,
                true,
                true,
                20,
                true,
                false,
                true,
                null
        );
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
                new ArrayList<>(),
                new ArrayList<>(),
                userPreferences,
                new ArrayList<>(),
                new ArrayList<>()
        );
        userPreferences.setUser(user);
        User createdUser = userRepository.save(user);
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken =
                new VerificationToken(0, token, LocalDateTime.now().plusHours(24), user);
        verificationTokenRepository.save(verificationToken);
        String verificationUrl = "http://localhost:8080/fashion/users/verify/" + token;
        emailService.sendVerificationEmail(user.getEmail(),
                "Fashion Buddy email verification",
                "<p>Click the link below to activate your account:</p>" +
                     "<p><a href=\"" + verificationUrl + "\">Activate Account</a></p>");
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

    @Override
    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        String newPassword = UUID.randomUUID().toString();
        user.setPassword(passwordEncoder.encode(newPassword));
        emailService.sendVerificationEmail(user.getEmail(),
                "Fashion Buddy password reset",
                "This is your new temporary password: " + newPassword);
        userRepository.save(user);
    }

    @Override
    public User getUserInfo() {
        int currentUserId = authService.getCurrentUser().getId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return currentUser;
    }

    @Override
    public void changePassword(ChangePasswordRequest newPassword) {
        int currentUserId = authService.getCurrentUser().getId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        currentUser.setPassword(passwordEncoder.encode(newPassword.password()));
        userRepository.save(currentUser);
    }

    private void throwIfUserExists(UserCreate userCreate) {
        if (userRepository.existsByEmail(userCreate.email())) {
            throw new BadRequestException("User with this email already exists");
        }
    }
}
