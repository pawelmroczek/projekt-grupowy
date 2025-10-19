package com.fashionassistant.services;

import com.fashionassistant.entities.*;

import java.util.List;

public interface OutfitService {
    OutfitGet addOutfit(OutfitCreate outfit);

    List<OutfitGet> getOutfits(Integer page, Integer pageSize);

    List<Outfit> getFriendsOutfits(Integer page, Integer pageSize);

    OutfitGet updateOutfit(OutfitUpdate outfit);

    void deleteOutfitById(int id);
}
