package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {
    private final ClothesRepository clothesRepository;
    private final PictureService pictureService;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final HouseholdRepository householdRepository;
    private final PictogramsRepository pictogramsRepository;
    private final OutfitRepository outfitRepository;

    @Override
    public List<ClothesGet> getClothes(Integer page, Integer pageSize) {
        User user = authService.getCurrentUser();
        List<Clothes> clothes;
        List<ClothesGet> clothesGets = new ArrayList<>();
        if (page != null && pageSize != null) {
            PageRequest pageRequest = PageRequest.of(page, pageSize);
            Page<Clothes> clothesPage = clothesRepository.findClothesByUserId(user.getId(), pageRequest);
            clothes = clothesPage.getContent();
        } else {
            clothes = clothesRepository.findClothesByUserId(user.getId());
        }
        clothes.forEach(singleClothes -> {
            clothesGets.add(new ClothesGet(singleClothes));
        });
        return clothesGets;
    }

    @Override
    public List<ClothesHouseholdGet> getClothesFromHousehold() {
        User currentUser = authService.getCurrentUser();
        List<ClothesHouseholdGet> clothesGets = new ArrayList<>();
        List<Clothes> clothes;
        if (currentUser.getHousehold() != null) {
            Household household = householdRepository.findById(currentUser.getHousehold().getId())
                    .orElseThrow(() -> new NotFoundException("Household not found"));
            Set<User> users = household.getUsers();
            clothes = new ArrayList<>();
            users.forEach(
                    user -> clothes.addAll(user.getClothes())
            );
        } else {
            clothes = clothesRepository.findClothesByUserId(currentUser.getId());
        }
        clothes.forEach(singleClothes -> {
            clothesGets.add(new ClothesHouseholdGet(singleClothes,
                    currentUser.getId() == singleClothes.getUser().getId()));
        });
        return clothesGets;
    }

    @Override
    public List<Clothes> getFriendsClothes(Integer page, Integer pageSize) {
        User currentUser = authService.getCurrentUser();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        List<Clothes> friendsClothes;
        Set<User> friends = user.getFriends();
        List<Integer> visibleValues = List.of(Visibility.PUBLIC, Visibility.FRIENDS);
        List<Integer> userIds = friends.stream().map(User::getId).toList();
        if (page != null && pageSize != null) {
            PageRequest pageRequest = PageRequest.of(page, pageSize);
            Page<Clothes> clothesPage = clothesRepository.findByUserIdInAndVisibleIn(userIds, visibleValues, pageRequest);
            friendsClothes = clothesPage.getContent();
        } else {
            friendsClothes = clothesRepository.findByUserIdInAndVisibleIn(userIds, visibleValues);
        }
        return friendsClothes;
    }

    @Override
    public List<Clothes> getPublicClothes(Integer page, Integer pageSize) {
        Integer publicVisibility = Visibility.PUBLIC;
        Integer currentUserId = authService.getCurrentUser().getId();

        List<Clothes> publicClothes;
        if (page != null && pageSize != null) {
            PageRequest pageRequest = PageRequest.of(page, pageSize);
            Page<Clothes> clothesPage = clothesRepository.findByVisibleAndUserIdNot(publicVisibility, currentUserId, pageRequest);
            publicClothes = clothesPage.getContent();
        } else {
            publicClothes = clothesRepository.findByVisibleAndUserIdNot(publicVisibility, currentUserId);
        }
        return publicClothes;
    }

    @Override
    public ClothesGet updateClothes(ClothesUpdate clothesRequest) {
        MultipartFile file = clothesRequest.file();
        User user = authService.getCurrentUser();
        Picture picture = pictureService.savePicture(file);
        Clothes clothes = clothesRepository.findById(clothesRequest.id())
                .orElseThrow(() -> new BadRequestException("Clothes not found"));
        if (clothes.getUser().getId() == user.getId()) {
            int pictureId = clothes.getPicture().getId();
            clothes.setPicture(null);
            pictureService.deleteById(pictureId);
            clothes.setName(clothesRequest.name());
            clothes.setCategory(clothesRequest.category());
            clothes.setColor(clothesRequest.color());
            clothes.setColorHex(clothesRequest.colorHex());
            clothes.setSize(clothesRequest.size());
            clothes.setClean(clothesRequest.clean());
            clothes.setVisible(clothesRequest.visible());
            clothes.setPriority(clothesRequest.priority());
            clothes.setPicture(picture);
            picture.setClothes(clothes);
            clothes.setSeasons(clothes.getSeasons());
            if (clothesRequest.pictogramIds() != null) {
                Set<Pictograms> pictograms = clothesRequest.pictogramIds().stream()
                        .map(id -> pictogramsRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Pictogram not found with id: " + id)))
                        .collect(Collectors.toSet());
                clothes.setPictograms(pictograms);
            }

            Clothes clothesNew = clothesRepository.save(clothes);
            return new ClothesGet(clothesNew);
        }
        throw new BadRequestException("Clothes not found");
    }

    @Override
    @Transactional
    public void deleteClothesById(int id) {
        Clothes clothes = clothesRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Clothes not found"));
        User user = authService.getCurrentUser();
        user = userRepository.findById(user.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));
        if (clothes.getUser().getId() == user.getId()) {

            Set<Outfit> outfits = new HashSet<>(clothes.getOutfits());
            for (Outfit outfit : outfits) {
                outfit.getClothes().clear();
                user.getOutfits().remove(outfit);
            }

            Set<Laundry> laundries = new HashSet<>(clothes.getLaundries());
            for (Laundry laundry : laundries) {
                laundry.getClothes().remove(clothes);
            }

            pictureService.deleteById(clothes.getPicture().getId());

            clothes.setUser(null);
            user.getClothes().remove(clothes);
            clothesRepository.deleteById(id);
        }
    }

    @Override
    public List<ClothesGet> toggleStatus(List<Integer> ids) {
        List<ClothesGet> response = new ArrayList<>();
        for (Integer id : ids) {
            Clothes clothes = clothesRepository.findById(id)
                    .orElseThrow(() -> new BadRequestException("Clothes not found"));
            User user = authService.getCurrentUser();
            if (clothes.getUser().getId() == user.getId() ||
                    clothes.getUser().getHousehold().getId() == user.getHousehold().getId()) {
                clothes.setClean(!clothes.isClean());
                Clothes changedClothes = clothesRepository.save(clothes);
                response.add(new ClothesGet(changedClothes));
            }
        }
        return response;
    }

    @Override
    public ClothesGet addClothes(ClothesCreate clothesRequest) {
        MultipartFile file = clothesRequest.file();
        User user = authService.getCurrentUser();
        Picture picture = pictureService.savePicture(file);
        Clothes clothes = new Clothes(
                0,
                clothesRequest.name(),
                clothesRequest.category(),
                clothesRequest.type(),
                clothesRequest.color(),
                clothesRequest.colorHex(),
                clothesRequest.size(),
                LocalDate.now(),
                clothesRequest.clean(),
                clothesRequest.visible(),
                clothesRequest.priority(),
                picture,
                user,
                new HashSet<>(), // this is empty list of pictograms 
                new HashSet<>(), // laundries
                new HashSet<>(),  // outfits   
                clothesRequest.seasons(),
                null,
                null
        );

        if (clothesRequest.pictogramIds() != null && !clothesRequest.pictogramIds().isEmpty()) {
            Set<Pictograms> pictograms = clothesRequest.pictogramIds().stream()
                    .map(id -> pictogramsRepository.findById(id)
                            .orElseThrow(() -> new NotFoundException("Pictogram not found with id: " + id)))
                    .collect(Collectors.toSet());
            clothes.setPictograms(pictograms);
        }

        picture.setClothes(clothes);
        user.addClothes(clothes);
        Clothes addedClothes = clothesRepository.save(clothes);
        return new ClothesGet(addedClothes);
    }

    @Override
    public int getOutfitsCountForClothes(int clothesId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new BadRequestException("Clothes not found"));

        return clothes.getOutfits() != null ? clothes.getOutfits().size() : 0;
    }

}
