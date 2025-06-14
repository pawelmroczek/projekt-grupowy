package com.fashionassistant.repositories;

import com.fashionassistant.entities.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutfitRepository extends JpaRepository<Outfit, Integer> {
    List<Outfit> findByUserId(int userId); 
}