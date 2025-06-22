package com.fashionassistant.services;

import com.fashionassistant.entities.OutfitCreate;
import com.fashionassistant.entities.OutfitGet;
import com.fashionassistant.entities.OutfitUpdate;

import java.util.List;

public interface OutfitService {
    OutfitGet addOutfit(OutfitCreate outfit);

    List<OutfitGet> getOutfits();

    OutfitGet updateOutfit(OutfitUpdate outfit);

    void deleteOutfitById(int id);
}
