package com.fashionassistant.rest;

import com.fashionassistant.entities.LaundryGet;
import com.fashionassistant.services.LaundryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fashion/laundries")
@RequiredArgsConstructor
public class LaundriesController {
    private final LaundryService laundryService;

    @PostMapping
    public LaundryGet doLaundry(@RequestBody List<Integer> clothesIds) {
        return laundryService.doLaundry(clothesIds);
    }

    @GetMapping
    public List<LaundryGet> getAllLaundries() {
        return laundryService.getAllLaundries();
    }
}
