package com.fashionassistant.repositories;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.Season;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
        SELECT c FROM Clothes c
        WHERE c.user.id IN :userIds
        AND c.visible IN :visible
        AND (:clean IS NULL OR c.clean = :clean)
        AND (:types IS NULL OR c.type IN :types)
        AND (:season IS NULL OR :season MEMBER OF c.seasons)
    """)
    List<Clothes> findFriendsClothesFiltered(
            @Param("userIds") List<Integer> userIds,
            @Param("visible") List<Integer> visible,
            @Param("clean") Boolean clean,
            @Param("types") List<String> types,
            @Param("season") Season season
    );

    @Query("""
        SELECT c FROM Clothes c
        WHERE c.user.id IN :userIds
        AND c.visible IN :visible
        AND (:clean IS NULL OR c.clean = :clean)
        AND (:types IS NULL OR c.type IN :types)
        AND (:season IS NULL OR :season MEMBER OF c.seasons)
    """)
    List<Clothes> findHouseholdClothesFiltered(
            @Param("userIds") List<Integer> userIds,
            @Param("visible") List<Integer> visible,
            @Param("clean") Boolean clean,
            @Param("types") List<String> types,
            @Param("season") Season season
    );
}
