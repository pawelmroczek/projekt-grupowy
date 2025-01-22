package com.fashionassistant.services;

import com.fashionassistant.entities.Token;
import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserAuth;

public interface AuthService {
    Token logIn(UserAuth user);

    User getCurrentUser();
}
