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

    Page<Clothes> findByUserIdInAndVisibleIn(List<Integer> userIds, List<Integer> visible, Pageable pageable);

    List<Clothes> findByUserIdInAndVisibleIn(List<Integer> userIds, List<Integer> visible);

    Page<Clothes> findByVisible(Integer visible, Pageable pageable);

    List<Clothes> findByVisible(Integer visible);

    Page<Clothes> findByVisibleAndUserIdNot(Integer visible, Integer userId, Pageable pageable);

    List<Clothes> findByVisibleAndUserIdNot(Integer visible, Integer userId);
}
