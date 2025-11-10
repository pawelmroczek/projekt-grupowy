package com.fashionassistant.rest;

import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.ClothesGet;
import com.fashionassistant.entities.ClothesHouseholdGet;
import com.fashionassistant.entities.ClothesUpdate;
import com.fashionassistant.services.ClothesService;
import com.fashionassistant.entities.Season;
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
    public List<ClothesGet> getAllClothes(@RequestParam(required = false) Integer page,
                                          @RequestParam(required = false) Integer size) {
        return clothesService.getClothes(page, size);
    }

    @GetMapping("/household")
    public List<ClothesHouseholdGet> getAllClothesFromHousehold() {
        return clothesService.getClothesFromHousehold();
    }
    @GetMapping("/household/filtered")
    public List<ClothesGet> getFilteredHouseholdClothes(@RequestParam(required = false) Boolean clean,
                                                      @RequestParam(required = false) List<String> types,
                                                      @RequestParam(required = false) Season season) {
        return clothesService.getHouseholdClothesFiltered(clean, types, season).stream()
                .map(ClothesGet::new).toList();
    }

    @GetMapping("/friends")
    public List<ClothesGet> getAllClothesFromFriends(@RequestParam(required = false) Integer page,
                                                     @RequestParam(required = false) Integer size) {
        return clothesService.getFriendsClothes(page, size).stream()
                .map(ClothesGet::new).toList();
    }

    @GetMapping("/friends/filtered")
    public List<ClothesGet> getFilteredFriendsClothes(@RequestParam(required = false) Boolean clean,
                                                      @RequestParam(required = false) List<String> types,
                                                      @RequestParam(required = false) Season season) {
        return clothesService.getFilteredFriendsClothes(clean, types, season).stream()
                .map(ClothesGet::new).toList();
    }

    @GetMapping("/public")
    public List<ClothesGet> getAllPublicClothes(@RequestParam(required = false) Integer page,
                                                @RequestParam(required = false) Integer size) {
        return clothesService.getPublicClothes(page, size).stream()
                .map(ClothesGet::new)
                .toList();
    }

    @PutMapping
    public ClothesGet updateClothes(@ModelAttribute ClothesUpdate clothes) {
        return clothesService.updateClothes(clothes);
    }

    @DeleteMapping("/{id}")
    public void deleteClothes(@PathVariable int id) {
        clothesService.deleteClothesById(id);
    }

    @GetMapping("/{id}/outfitsCount")
    public int getOutfitsCount(@PathVariable int id) {
        return clothesService.getOutfitsCountForClothes(id);
    }
}
