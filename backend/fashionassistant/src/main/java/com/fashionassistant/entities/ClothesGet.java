package com.fashionassistant.entities;

import java.time.LocalDate;

public record ClothesGet(int id, String name, String type,
                         String color, String size, LocalDate createdAt,
                         boolean clean, int priority, String picture, String user) {
    public ClothesGet(Clothes clothes) {
        this(clothes.getId(), clothes.getName(), clothes.getType(), clothes.getColor(),
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(), clothes.getPriority(),
                clothes.getPicture().getUrl(), clothes.getUser().getEmail());
    }
}
