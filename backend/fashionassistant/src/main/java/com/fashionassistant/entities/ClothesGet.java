package com.fashionassistant.entities;

import java.time.LocalDate;

public record ClothesGet(int id, String name, String type,
                         String color, String size, LocalDate createdAt,
                         boolean clean, String picture, String user) {
}
