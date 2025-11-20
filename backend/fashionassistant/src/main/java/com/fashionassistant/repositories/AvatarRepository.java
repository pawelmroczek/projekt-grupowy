package com.fashionassistant.repositories;

import com.fashionassistant.entities.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Integer> {
    Optional<Avatar> findByUserId(Integer userId);
}