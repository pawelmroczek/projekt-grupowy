package com.fashionassistant.repositories;

import com.fashionassistant.entities.Clothes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
    Page<Clothes> findClothesByUserId(int userId, Pageable pageable);

    List<Clothes> findClothesByUserId(int userId);

    Page<Clothes> findByUserIdInAndVisible(List<Integer> userIds, boolean visible, Pageable pageable);

    List<Clothes> findByUserIdInAndVisible(List<Integer> userIds, boolean visible);
}
