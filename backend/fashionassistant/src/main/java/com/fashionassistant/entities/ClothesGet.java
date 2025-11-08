package com.fashionassistant.entities;

import java.util.List;
import java.time.LocalDate;
import java.util.Set;

public record ClothesGet(int id, Integer category, String name, String type,
                         String color, String colorHex, String size, LocalDate createdAt,
                         boolean clean, Integer visible, int priority, String picture, String user, List<Integer> pictogramIds, Set<Season> seasons) {
    public ClothesGet(Clothes clothes) {
        this(clothes.getId(), clothes.getCategory(), clothes.getName(), clothes.getType(), clothes.getColor(), clothes.getColorHex(), 
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(), clothes.getVisible(), clothes.getPriority(),
                clothes.getPicture().getUrl(), clothes.getUser().getEmail(), clothes.getPictograms().stream().map(Pictograms::getId).toList(), clothes.getSeasons());
    }
}
