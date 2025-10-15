package com.fashionassistant.rest;

import com.fashionassistant.entities.OutfitCreate;
import com.fashionassistant.entities.OutfitGet;
import com.fashionassistant.entities.OutfitUpdate;
import com.fashionassistant.services.OutfitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fashion/outfits")
@RequiredArgsConstructor
public class OutfitController {
    private final OutfitService outfitService;

    @GetMapping("/test")
    public String test() {
        System.out.println(">>> Wszedł do kontrolera1");
        return "OK";
    }    

    @PostMapping
    public OutfitGet addOutfit(@RequestBody OutfitCreate outfit) {
        System.out.println(">>> Wszedł do kontrolera2");
        return outfitService.addOutfit(outfit);
    }

    @GetMapping
    public List<OutfitGet> getAllOutfits() {
        return outfitService.getOutfits();
    }

    @GetMapping("/friends")
    public List<OutfitGet> getAllOutfitsFromFriends() {
        return outfitService.getFriendsOutfits().stream()
                .map(OutfitGet::new).toList();
    }

    @PutMapping
    public OutfitGet updateOutfit(@RequestBody OutfitUpdate outfit) {
        return outfitService.updateOutfit(outfit);
    }

    @DeleteMapping("/{id}")
    public void deleteOutfit(@PathVariable int id) {
        outfitService.deleteOutfitById(id);
    }
}
