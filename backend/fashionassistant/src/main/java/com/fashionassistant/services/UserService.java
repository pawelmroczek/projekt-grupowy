package com.fashionassistant.services;

import com.fashionassistant.entities.ChangePasswordRequest;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.entities.UserFriendGet;

import java.util.List;

public interface UserService {
    UserFriendGet signUp(UserCreate userCreate);

    List<UserFriendGet> getUsersByUsername(String username);

    void verify(String token);

    void resetPassword(String email);

    User getUserInfo();

    void changePassword(ChangePasswordRequest newPassword);
}
