package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.List;

public record OutfitGet(int id, String name, String type, LocalDate createdAt, Integer visible, String user,
                        List<Clothes> clothes) {

    public OutfitGet(Outfit outfit) {
        this(outfit.getId(),
                outfit.getName(),
                outfit.getType(),
                outfit.getCreatedAt(),
                outfit.getVisible(),
                outfit.getUser().getEmail(),
                outfit.getClothes());
    }
}
