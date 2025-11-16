package com.fashionassistant.services;

import com.fashionassistant.entities.*;

import java.util.List;

public interface ClothesService {
    ClothesGet addClothes(ClothesCreate clothes);

    List<ClothesGet> getClothes(Integer page, Integer pageSize);

    List<ClothesHouseholdGet> getClothesFromHousehold();

    List<Clothes> getHouseholdClothesFiltered(Boolean clean, List<String> types, Season season);

    List<Clothes> getFriendsClothes(Integer page, Integer pageSize);

    List<Clothes> getFilteredFriendsClothes(Boolean clean, List<String> types, Season season);

    List<Clothes> getPublicClothes(Integer page, Integer pageSize);

    List<Clothes> getLoanClothes();

    ClothesGet updateClothes(ClothesUpdate clothes);

    void deleteClothesById(int id);

    List<ClothesGet> toggleStatus(List<Integer> ids);

    int getOutfitsCountForClothes(int clothesId);
}
