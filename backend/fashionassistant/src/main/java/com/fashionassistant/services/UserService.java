package com.fashionassistant.services;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.UserCreate;

public interface UserService {
    Token signUp(UserCreate userCreate);
}
