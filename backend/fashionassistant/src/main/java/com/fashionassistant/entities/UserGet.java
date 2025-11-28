package com.fashionassistant.entities;

public record UserGet(int id, String username, String email, String avatar) {
    public UserGet(User user) {
        this(user.getId(), user.getUsername(), user.getEmail(), user.getAvatar() != null ? user.getAvatar().getUrl() : null);
    }
}
