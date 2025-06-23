package com.fashionassistant.services;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.UserCreate;
import com.fashionassistant.entities.UserFriendGet;

import java.util.List;

public interface UserService {
    Token signUp(UserCreate userCreate);
    List<UserFriendGet> getUsersByUsername(String username);
}
