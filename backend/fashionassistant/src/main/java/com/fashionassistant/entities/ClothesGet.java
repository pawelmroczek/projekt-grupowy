package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public record ClothesGet(int id, Integer category, String name, String type,
                         String color, String colorHex, String size, LocalDate createdAt,
                         boolean clean, Integer visible, int priority,
                         String picture, String user, int userId, String userAvatar, List<Integer> pictogramIds,
                         Set<Season> seasons, boolean isLoaned) {
    public ClothesGet(Clothes clothes) {
        this(clothes.getId(), clothes.getCategory(), clothes.getName(), clothes.getType(), clothes.getColor(), clothes.getColorHex(),
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(), clothes.getVisible(), clothes.getPriority(),
                clothes.getPicture() != null ? clothes.getPicture().getUrl() : null, clothes.getUser().getEmail(), clothes.getUser().getId(),
                clothes.getUser().getAvatar() != null ? clothes.getUser().getAvatar().getUrl() : null,
                clothes.getPictograms().stream().map(Pictograms::getId).toList(), clothes.getSeasons(),
                clothes.getLoanFinishDate() != null);
    }
}
