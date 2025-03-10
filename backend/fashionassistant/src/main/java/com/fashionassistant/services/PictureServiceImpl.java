package com.fashionassistant.services;

import com.fashionassistant.entities.Picture;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.repositories.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PictureServiceImpl implements PictureService {
    private final PictureRepository pictureRepository;

    public Picture savePicture(MultipartFile file) {
        Picture picture = new Picture();
        try {
            String fileName = saveFileToServer(file);
            picture.setName(fileName);
            picture.setUrl("http://images-server:80/uploads/" + fileName);
        } catch (IOException exc) {
            throw new BadRequestException("Problem with file");
        }
        return picture;
    }

    @Override
    public void deleteById(int id) {
        pictureRepository.deleteById(id);
    }

    private String saveFileToServer(MultipartFile file) throws IOException {
        String uploadDirectory = "/app/uploads/";
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
}