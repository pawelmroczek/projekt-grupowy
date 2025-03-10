package com.fashionassistant.services;

import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.ClothesGet;
import com.fashionassistant.entities.ClothesUpdate;

import java.util.List;

public interface ClothesService {
    ClothesGet addClothes(ClothesCreate clothes);

    List<ClothesGet> getClothes();

    ClothesGet updateClothes(ClothesUpdate clothes);

    void deleteClothesById(int id);
}
