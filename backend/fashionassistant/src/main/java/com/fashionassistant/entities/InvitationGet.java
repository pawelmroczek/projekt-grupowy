package com.fashionassistant.entities;

public record InvitationGet(int id, int fromUser, String fromUsername, String fromUserAvatar, int toUser, String type) {
}
