package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.repositories.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {
    private final ClothesRepository clothesRepository;
    private final PictureService pictureService;
    private final AuthService authService;

    @Override
    public List<ClothesGet> getClothes() {
        User user = authService.getCurrentUser();
        List<ClothesGet> clothesGets = new ArrayList<>();
        List<Clothes> clothes = clothesRepository.findClothesByUserId(user.getId());
        clothes.forEach(singleClothes -> {
            clothesGets.add(new ClothesGet(singleClothes.getId(), singleClothes.getName(),
                    singleClothes.getType(), singleClothes.getColor(),
                    singleClothes.getSize(), singleClothes.getCreatedAt(),
                    singleClothes.isClean(), singleClothes.getPicture().getUrl(),
                    singleClothes.getUser().getEmail()));
        });
        return clothesGets;
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
            clothes.setColor(clothesRequest.color());
            clothes.setSize(clothesRequest.size());
            clothes.setClean(clothesRequest.clean());
            clothes.setPicture(picture);
            picture.setClothes(clothes);
            Clothes clothesNew = clothesRepository.save(clothes);
            return new ClothesGet(clothesNew.getId(), clothesNew.getName(), clothesNew.getType(),
                    clothesNew.getColor(), clothesNew.getSize(), clothesNew.getCreatedAt(),
                    clothesNew.isClean(), clothesNew.getPicture().getUrl(), clothesNew.getUser().getEmail());
        }
        throw new BadRequestException("Clothes not found");
    }

    @Override
    public void deleteClothesById(int id) {
        Clothes clothes = clothesRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Clothes not found"));
        User user = authService.getCurrentUser();
        if (clothes.getUser().getId() == user.getId()) {
            int pictureId = clothes.getPicture().getId();
            clothes.setPicture(null);
            pictureService.deleteById(pictureId);
            clothes.setUser(null);
            user.getClothes().remove(clothes);
            clothesRepository.deleteById(id);
        }
    }

    @Override
    public ClothesGet addClothes(ClothesCreate clothesRequest) {
        MultipartFile file = clothesRequest.file();
        User user = authService.getCurrentUser();
        Picture picture = pictureService.savePicture(file);
        Clothes clothes = new Clothes(
                0,
                clothesRequest.name(),
                clothesRequest.type(),
                clothesRequest.color(),
                clothesRequest.size(),
                LocalDate.now(),
                clothesRequest.clean(),
                picture,
                user
        );
        picture.setClothes(clothes);
        user.addClothes(clothes);
        Clothes addedClothes = clothesRepository.save(clothes);
        return new ClothesGet(addedClothes.getId(), addedClothes.getName(), addedClothes.getType(),
                addedClothes.getColor(), addedClothes.getSize(), addedClothes.getCreatedAt(),
                addedClothes.isClean(), addedClothes.getPicture().getUrl(), addedClothes.getUser().getEmail());
    }

}
