package com.fashionassistant.entities;

import org.springframework.web.multipart.MultipartFile;

public record ClothesUpdate(int id, String name, String type, String color,
                            String size, boolean clean, boolean visible, int priority, MultipartFile file) {
}
