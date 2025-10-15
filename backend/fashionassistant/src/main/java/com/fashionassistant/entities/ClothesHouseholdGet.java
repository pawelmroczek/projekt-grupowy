package com.fashionassistant.entities;

import java.time.LocalDate;

public record ClothesHouseholdGet(int id, Integer category, String name, String type,
                                  String color, String size, LocalDate createdAt,
                                  boolean clean, String picture, String user, boolean isMine) {
    public ClothesHouseholdGet(Clothes clothes, boolean isMine) {
        this(clothes.getId(), clothes.getCategory(), clothes.getName(), clothes.getType(), clothes.getColor(),
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(),
                clothes.getPicture().getUrl(), clothes.getUser().getEmail(), isMine);
    }
}
