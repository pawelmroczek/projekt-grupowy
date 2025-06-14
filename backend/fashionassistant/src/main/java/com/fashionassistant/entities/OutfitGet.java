package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.List;

public record OutfitGet(int id, String name, String type,
                        LocalDate createdAt, String user, List<String> clothesNames) {

    public OutfitGet(Outfit outfit) {
        this(outfit.getId(),
             outfit.getName(),
             outfit.getType(),
             outfit.getCreatedAt(),
             outfit.getUser().getEmail(),
             outfit.getClothes().stream()
                   .map(Clothes::getName)
                   .toList());
    }
}
