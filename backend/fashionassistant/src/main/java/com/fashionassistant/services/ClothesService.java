package com.fashionassistant.services;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.ClothesGet;

import java.util.List;

public interface ClothesService {
    Clothes getClothesById(int id);

    ClothesGet addClothes(ClothesCreate clothes);

    List<ClothesGet> getClothes();
}
