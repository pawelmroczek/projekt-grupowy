package com.fashionassistant.entities;

import org.springframework.web.multipart.MultipartFile;

public record ClothesCreate(String name, Integer category, String type, String color,
                            String size, boolean clean, Integer visible, int priority, MultipartFile file) {
}
