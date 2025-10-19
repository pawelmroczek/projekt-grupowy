package com.fashionassistant.entities;
import java.util.List; 

import org.springframework.web.multipart.MultipartFile;

public record OutfitCreate(String name, String type, Integer visible, List<Integer> clothesIds) {
}
