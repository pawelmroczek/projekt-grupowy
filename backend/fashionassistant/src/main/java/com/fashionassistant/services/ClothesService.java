package com.fashionassistant.services;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.ClothesCreate;

public interface ClothesService {
    Clothes getClothesById(int id);

    Clothes addClothes(ClothesCreate clothes);
}
