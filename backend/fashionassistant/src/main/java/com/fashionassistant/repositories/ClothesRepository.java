package com.fashionassistant.repositories;

import com.fashionassistant.entities.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
    List<Clothes> findClothesByUserId(int userId);
}
