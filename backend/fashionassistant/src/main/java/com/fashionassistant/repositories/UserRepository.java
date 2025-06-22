package com.fashionassistant.repositories;

import com.fashionassistant.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<List<User>> findAllByUsername(String username);

    boolean existsByEmail(String email);
}
