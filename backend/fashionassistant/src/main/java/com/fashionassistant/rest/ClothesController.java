package com.fashionassistant.rest;

import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.ClothesGet;
import com.fashionassistant.services.ClothesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fashion/clothes")
@RequiredArgsConstructor
public class ClothesController {
    private final ClothesService clothesService;

    @PostMapping
    public ClothesGet addClothes(@ModelAttribute ClothesCreate clothes) {
        return clothesService.addClothes(clothes);
    }

    @GetMapping
    public List<ClothesGet> getAllClothes() {
        return clothesService.getClothes();
    }
}
