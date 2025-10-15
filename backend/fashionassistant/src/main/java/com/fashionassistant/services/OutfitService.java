package com.fashionassistant.services;

import com.fashionassistant.entities.*;

import java.util.List;

public interface OutfitService {
    OutfitGet addOutfit(OutfitCreate outfit);

    List<OutfitGet> getOutfits();

    List<Outfit> getFriendsOutfits();

    OutfitGet updateOutfit(OutfitUpdate outfit);

    void deleteOutfitById(int id);
}
