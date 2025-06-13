package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.OutfitRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OutfitServiceImpl implements OutfitService {

    private final OutfitRepository outfitRepository;
    private final ClothesRepository clothesRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    @Override
    public OutfitGet addOutfit(OutfitCreate outfitRequest) {
        User user = authService.getCurrentUser();

        List<Clothes> selectedClothes = clothesRepository.findAllById(outfitRequest.clothesIds());

        Outfit outfit = new Outfit(
                0,
                outfitRequest.name(),
                outfitRequest.type(),
                LocalDate.now(),
                user,
                selectedClothes
        );

        user.addOutfit(outfit);
        Outfit addedOutfit = outfitRepository.save(outfit);
        return new OutfitGet(addedOutfit);
    }

    @Override
    public List<OutfitGet> getOutfits() {
        User user = authService.getCurrentUser();
        List<Outfit> outfits = outfitRepository.findByUserId(user.getId());
        List<OutfitGet> outfitGets = new ArrayList<>();
        outfits.forEach(outfit -> outfitGets.add(new OutfitGet(outfit)));
        return outfitGets;
    }

    @Override
    public OutfitGet updateOutfit(OutfitUpdate outfitRequest) {
        User user = authService.getCurrentUser();
        Outfit outfit = outfitRepository.findById(outfitRequest.id())
                .orElseThrow(() -> new BadRequestException("Outfit not found"));

        if (outfit.getUser().getId() == user.getId()) {
            outfit.setName(outfitRequest.name());
            outfit.setType(outfitRequest.type());

            List<Clothes> selectedClothes = clothesRepository.findAllById(outfitRequest.clothesIds());
            outfit.setClothes(selectedClothes);

            Outfit updatedOutfit = outfitRepository.save(outfit);
            return new OutfitGet(updatedOutfit);
        }

        throw new BadRequestException("Outfit not found");
    }

    @Override
    public void deleteOutfitById(int id) {
        Outfit outfit = outfitRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Outfit not found"));

        User user = authService.getCurrentUser();
        user = userRepository.findById(user.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (outfit.getUser().getId() == user.getId()) {
            outfit.setUser(null);
            user.getOutfits().remove(outfit);
            outfitRepository.deleteById(id);
        }
    }
}
