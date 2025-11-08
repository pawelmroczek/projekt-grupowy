package com.fashionassistant.entities;

import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

public record ClothesUpdate(int id, Integer category, String name, String type, String color, String colorHex,
                            String size, boolean clean, Integer visible, int priority, MultipartFile file, List<Integer> pictogramIds, Set<Season> seasons) {
}
