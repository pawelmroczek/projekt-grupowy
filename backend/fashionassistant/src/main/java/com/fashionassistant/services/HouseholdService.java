package com.fashionassistant.services;

import com.fashionassistant.entities.UserFriendGet;

import java.util.List;

public interface HouseholdService {
    List<UserFriendGet> getUsersFromHousehold();

    void leaveHousehold();
}
