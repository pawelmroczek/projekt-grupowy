package com.fashionassistant.services;

import com.fashionassistant.entities.Avatar;
import org.springframework.web.multipart.MultipartFile;

public interface AvatarService {
    Avatar saveAvatar(MultipartFile file);
    void deleteCurrentUserAvatar();
}