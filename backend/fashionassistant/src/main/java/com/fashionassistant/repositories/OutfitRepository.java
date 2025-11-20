package com.fashionassistant.repositories;

import com.fashionassistant.entities.Outfit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutfitRepository extends JpaRepository<Outfit, Integer> {
    Page<Outfit> findOutfitByUserId(int userId, Pageable pageable);

    List<Outfit> findOutfitByUserId(int userId);

    Page<Outfit> findByUserIdInAndVisibleIn(List<Integer> userIds, List<Integer> visible, Pageable pageable);

    List<Outfit> findByUserIdInAndVisibleIn(List<Integer> userIds, List<Integer> visible);

    Page<Outfit> findByVisible(Integer visible, Pageable pageable);

    List<Outfit> findByVisible(Integer visible);

    Page<Outfit> findByVisibleAndUserIdNot(Integer visible, Integer userId, Pageable pageable);

    List<Outfit> findByVisibleAndUserIdNot(Integer visible, Integer userId);
}