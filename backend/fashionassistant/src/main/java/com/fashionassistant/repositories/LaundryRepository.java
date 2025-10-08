package com.fashionassistant.repositories;

import com.fashionassistant.entities.Laundry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaundryRepository extends JpaRepository<Laundry, Integer> {
    List<Laundry> findAllByUserId(int userId);
}
