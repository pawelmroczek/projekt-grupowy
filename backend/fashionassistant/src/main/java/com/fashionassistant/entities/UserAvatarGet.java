package com.fashionassistant.entities;

public record UserAvatarGet(int id, String username, String email, String avatarUrl) {
    public UserAvatarGet(User user) {
        this(user.getId(), user.getUsername(), user.getEmail(), user.getAvatar() != null ? user.getAvatar().getUrl() : null);
    }
}