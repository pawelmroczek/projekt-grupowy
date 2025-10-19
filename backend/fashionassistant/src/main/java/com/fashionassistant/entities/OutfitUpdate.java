package com.fashionassistant.entities;

import java.util.List;

public record OutfitUpdate(int id, String name, String type, Integer visible, List<Integer> clothesIds) {
}