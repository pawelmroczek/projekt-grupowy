package com.fashionassistant.repositories;

import com.fashionassistant.entities.Pictograms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictogramsRepository extends JpaRepository<Pictograms, Integer> {

    Optional<Pictograms> findByName(String name);
}
