package com.fashionassistant.entities;

import java.time.LocalDate;

public record ClothesGet(int id, Integer category, String name, String type,
                         String color, String size, LocalDate createdAt,
                         boolean clean, Integer visible, int priority, String picture, String user) {
    public ClothesGet(Clothes clothes) {
        this(clothes.getId(), clothes.getCategory(), clothes.getName(), clothes.getType(), clothes.getColor(),
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(), clothes.getVisible(), clothes.getPriority(),
                clothes.getPicture().getUrl(), clothes.getUser().getEmail());
    }
}
