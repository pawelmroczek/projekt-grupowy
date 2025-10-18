package com.fashionassistant.services;

import com.fashionassistant.entities.*;

import java.util.List;

public interface ClothesService {
    ClothesGet addClothes(ClothesCreate clothes);

    List<ClothesGet> getClothes(Integer page, Integer pageSize);

    List<ClothesHouseholdGet> getClothesFromHousehold();

    List<Clothes> getFriendsClothes();

    ClothesGet updateClothes(ClothesUpdate clothes);

    void deleteClothesById(int id);

    List<ClothesGet> toggleStatus(List<Integer> ids);
}
