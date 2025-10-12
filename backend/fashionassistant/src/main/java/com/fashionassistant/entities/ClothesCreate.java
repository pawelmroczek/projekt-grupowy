package com.fashionassistant.entities;

import org.springframework.web.multipart.MultipartFile;

public record ClothesCreate(String name, String type, String color,
                            String size, boolean clean, int priority, MultipartFile file) {
}
