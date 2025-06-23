package com.fashionassistant.rest;

import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.ClothesGet;
import com.fashionassistant.entities.ClothesHouseholdGet;
import com.fashionassistant.entities.ClothesUpdate;
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

    @PostMapping("/toggleStatus")
    public List<ClothesGet> toggleStatus(@RequestBody List<Integer> ids) {
        return clothesService.toggleStatus(ids);
    }

    @GetMapping
    public List<ClothesGet> getAllClothes() {
        return clothesService.getClothes();
    }

    @GetMapping("/household")
    public List<ClothesHouseholdGet> getAllClothesFromHousehold() {
        return clothesService.getClothesFromHousehold();
    }

    @PutMapping
    public ClothesGet updateClothes(@ModelAttribute ClothesUpdate clothes) {
        return clothesService.updateClothes(clothes);
    }

    @DeleteMapping("/{id}")
    public void deleteClothes(@PathVariable int id) {
        clothesService.deleteClothesById(id);
    }
}
