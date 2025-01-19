package com.fashionassistant.rest;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.services.ClothesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fashion/clothes")
@RequiredArgsConstructor
public class ClothesController {
    private final ClothesService clothesService;

    @PostMapping
    public Clothes addClothes(@ModelAttribute ClothesCreate clothes) {
        return clothesService.addClothes(clothes);
    }
}
