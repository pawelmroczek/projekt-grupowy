package com.fashionassistant.repositories;

import com.fashionassistant.entities.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Integer> {
    Optional<Picture> findByUrl(String url);

    Optional<Picture> findByUserId(int userId);

}
