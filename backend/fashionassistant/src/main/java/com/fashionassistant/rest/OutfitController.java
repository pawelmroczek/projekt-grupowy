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
        return outfitService.addOutfit(outfit);
    }

    @GetMapping
    public List<OutfitGet> getAllOutfits(@RequestParam(required = false) Integer page,
                                         @RequestParam(required = false) Integer size) {
        return outfitService.getOutfits(page, size);
    }

    @GetMapping("/friends")
    public List<OutfitGet> getAllOutfitsFromFriends(@RequestParam(required = false) Integer page,
                                                    @RequestParam(required = false) Integer size) {
        return outfitService.getFriendsOutfits(page, size).stream()
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
