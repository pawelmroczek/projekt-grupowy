package com.fashionassistant.entities;

import java.util.List;
import java.time.LocalDate;
import java.util.Set;

public record ClothesHouseholdGet(int id, Integer category, String name, String type,
                                  String color, String colorHex, String size, LocalDate createdAt,
                                  boolean clean, String picture, String user, boolean isMine, List<Integer> pictogramIds, Set<Season> seasons) {
    public ClothesHouseholdGet(Clothes clothes, boolean isMine) {
        this(clothes.getId(), clothes.getCategory(), clothes.getName(), clothes.getType(), clothes.getColor(), clothes.getColorHex(),
                clothes.getSize(), clothes.getCreatedAt(), clothes.isClean(),
                clothes.getPicture().getUrl(), clothes.getUser().getEmail(), isMine, clothes.getPictograms().stream().map(Pictograms::getId).toList(), clothes.getSeasons());
    }
}
