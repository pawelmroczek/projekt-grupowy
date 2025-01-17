package com.fashionassistant.rest;

import com.fashionassistant.entities.Picture;
import com.fashionassistant.services.PictureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("fashion/pictures")
@RequiredArgsConstructor
public class PictureController {

    private final PictureService pictureService;


    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<Picture>> getPictureByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(pictureService.getPictureByUserId(userId));
    }

    @GetMapping("/url/{url}")
    public ResponseEntity<Optional<Picture>> getPictureByUserId(@PathVariable String url) {
        return ResponseEntity.ok(pictureService.getPictureByUrl(url));
    }

    @PostMapping("/upload")
    public ResponseEntity<Picture> uploadPicture(@RequestParam("file") MultipartFile file, @RequestParam("userId") int userId) {
        try {
            // Zapisz plik na serwerze
            String fileName = saveFileToServer(file);
            // Utwórz obiekt Picture i zapisz URL w bazie danych
            Picture picture = new Picture();
            picture.setName(fileName);
            picture.setUrl("http://images-server:80/uploads/" + fileName);  // URL do Nginx
            picture.setUserId(userId);

            Picture savedPicture = pictureService.savePicture(picture);

            return ResponseEntity.ok(savedPicture);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    private String saveFileToServer(MultipartFile file) throws IOException {
        String uploadDirectory = "../uploads/";
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(uploadDirectory + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }
}
