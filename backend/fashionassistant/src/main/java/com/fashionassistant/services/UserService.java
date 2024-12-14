package com.fashionassistant.services;

import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserCreate;

public interface UserService {
    User signUp(UserCreate userCreate);
}
