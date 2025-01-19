package com.fashionassistant.services;

import com.fashionassistant.entities.Picture;
import org.springframework.web.multipart.MultipartFile;

public interface PictureService {
    Picture savePicture(MultipartFile file);
}
