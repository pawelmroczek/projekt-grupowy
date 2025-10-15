package com.fashionassistant.entities;

public record UserGet(int id, String username, String email) {
    public UserGet(User user) {
        this(user.getId(), user.getUsername(), user.getEmail());
    }
}
