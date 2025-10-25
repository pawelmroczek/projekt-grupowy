package com.fashionassistant.services;

import com.fashionassistant.entities.Pictograms;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface PictogramsService {

    Pictograms createOrUpdate(Pictograms pictograms);

    Optional<Pictograms> getById(Integer id);

    List<Pictograms> getAll();

    Pictograms update(Integer id, Pictograms pictograms);

    void delete(Integer id);
}
