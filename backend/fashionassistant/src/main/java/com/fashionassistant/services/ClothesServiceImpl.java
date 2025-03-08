package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {
    private final ClothesRepository clothesRepository;
    private final PictureService pictureService;
    private final AuthService authService;

    @Override
    public Clothes getClothesById(int id) {
        return clothesRepository.findById(id).orElseThrow(() -> new NotFoundException("Clothes not found"));
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

    @Override
    public List<ClothesGet> getClothes() {
        return List.of();
    }
}
