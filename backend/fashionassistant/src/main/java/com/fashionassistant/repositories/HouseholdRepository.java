package com.fashionassistant.repositories;

import com.fashionassistant.entities.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, Integer> {
}
