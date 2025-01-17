package com.fashionassistant.services;

import com.fashionassistant.entities.Picture;
import com.fashionassistant.repositories.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;


    public Optional<Picture> getPictureByUserId(int userId) {
        return pictureRepository.findByUserId(userId);
    }

    public Optional<Picture> getPictureByUrl(String url) {
        return pictureRepository.findByUrl(url);
    }

    public Picture savePicture(Picture picture) {
        return pictureRepository.save(picture);
    }
}