package com.fashionassistant.services;

import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.entities.UserFriendGet;

import java.util.List;

public interface UserService {
    UserFriendGet signUp(UserCreate userCreate);

    List<UserFriendGet> getUsersByUsername(String username);

    void verify(String token);
}
