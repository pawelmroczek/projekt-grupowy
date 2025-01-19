package com.fashionassistant.services;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.ClothesCreate;
import com.fashionassistant.entities.Picture;
import com.fashionassistant.entities.User;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public Clothes addClothes(ClothesCreate clothesRequest) {
        MultipartFile file = clothesRequest.file();
        //User user = authService.getCurrentUser();
        User user = new User();
        Picture picture = pictureService.savePicture(file);
        Clothes clothes = new Clothes(
                0,
                clothesRequest.name(),
                clothesRequest.type(),
                picture,
                user
        );
        picture.setClothes(clothes);
        return clothesRepository.save(clothes);
    }
}
