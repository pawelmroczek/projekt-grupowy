package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.LaundryRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LaundryServiceImpl implements LaundryService {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ClothesService clothesService;
    private final ClothesRepository clothesRepository;
    private final LaundryRepository laundryRepository;

    @Override
    public LaundryGet doLaundry(List<Integer> clothesIds) {
        User currentUser = authService.getCurrentUser();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        Laundry laundry = new Laundry(
                0,
                LocalDate.now(),
                user,
                user.getHousehold(),
                new HashSet<>()
        );
        List<ClothesHouseholdGet> householdClothes = new ArrayList<>();
        if (user.getHousehold() != null) {
            householdClothes = clothesService.getClothesFromHousehold();
        }
        for (int id : clothesIds) {
            Clothes currentClothes = clothesRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Clothes not found"));
            boolean isHouseholdClothes = householdClothes.stream()
                    .anyMatch(currentClothesHousehold ->
                            currentClothes.getId() == currentClothesHousehold.id());
            if (currentClothes.getUser().getId() != user.getId() && !isHouseholdClothes) {
                throw new BadRequestException("You don't have access to this clothes");
            }
            currentClothes.setClean(true);
            laundry.addClothes(currentClothes);
        }
        laundry = laundryRepository.save(laundry);
        Set<ClothesGet> laundryClothes = laundry.getClothes().stream().map(
                clothes -> new ClothesGet(clothes)
        ).collect(Collectors.toSet());
        return new LaundryGet(laundry.getId(), laundry.getDate(), laundry.getUser().getId(), laundryClothes);
    }

    @Override
    public List<LaundryGet> getAllLaundries() {
        User currentUser = authService.getCurrentUser();
        List<Laundry> laundries = laundryRepository.findAllByUserId(currentUser.getId());
        return laundries.stream()
                .map(laundry -> new LaundryGet(laundry.getId(),
                        laundry.getDate(), laundry.getUser().getId(),
                        laundry.getClothes().stream().map(clothes ->
                                new ClothesGet(clothes)).collect(Collectors.toSet())))
                .toList();
    }

}
