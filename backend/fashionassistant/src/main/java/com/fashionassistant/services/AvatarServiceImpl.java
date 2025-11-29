package com.fashionassistant.services;

import com.fashionassistant.entities.Avatar;
import com.fashionassistant.entities.User;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.AvatarRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AvatarServiceImpl implements AvatarService {
    private final AvatarRepository avatarRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    


    @Override
    public Avatar saveAvatar(MultipartFile file) {
        User currentUser = authService.getCurrentUser();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Avatar avatar = avatarRepository.findByUserId(user.getId()).orElse(new Avatar());
        avatar.setUser(user);

        try {
            String fileName = saveFileToServer(file);
            avatar.setName(fileName);
            avatar.setUrl("http://images-server:80/uploads/" + fileName);
        } catch (IOException e) {
            throw new BadRequestException("Problem with file upload");
        }

        Avatar saved = avatarRepository.saveAndFlush(avatar);
        user.setAvatar(saved);
        userRepository.save(user);
        return saved;
    }

    @Transactional
    @Override
    public void deleteCurrentUserAvatar() {
        User currentUser = authService.getCurrentUser();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        Avatar avatar = avatarRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Avatar not found"));
        user.setAvatar(null);
        userRepository.save(user);

        try {
            deleteFileFromServer(avatar);
        } catch (IOException e) {
            throw new BadRequestException("Problem deleting avatar file");
        }

        avatarRepository.delete(avatar);
        avatarRepository.flush();
    }

    private void deleteFileFromServer(Avatar avatar) throws IOException {
        String uploadDirectory = "/app/uploads/";
        String fileName = avatar.getName();
        Path path = Paths.get(uploadDirectory + fileName);
        Files.deleteIfExists(path);
    }

    private String saveFileToServer(MultipartFile file) throws IOException {
        String uploadDirectory = "/app/uploads/";
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
}
