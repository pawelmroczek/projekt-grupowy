package com.fashionassistant.entities;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public record ClothesCreate(String name, Integer category, String type, String color,
                            String size, boolean clean, Integer visible, int priority, MultipartFile file, List<Integer> pictogramIds) {
}
