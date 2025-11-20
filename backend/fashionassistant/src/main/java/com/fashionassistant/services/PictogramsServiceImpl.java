package com.fashionassistant.services.impl;

import com.fashionassistant.entities.Pictograms;
import com.fashionassistant.repositories.PictogramsRepository;
import com.fashionassistant.services.PictogramsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PictogramsServiceImpl implements PictogramsService {

    private final PictogramsRepository repository;

    public PictogramsServiceImpl(PictogramsRepository repository) {
        this.repository = repository;
    }

    @Override
    public Pictograms createOrUpdate(Pictograms pictograms) {
        return repository.findById(pictograms.getId())
                .map(existing -> {
                    existing.setName(pictograms.getName());
                    return repository.save(existing); 
                })
                .orElseGet(() -> repository.save(pictograms)); 
    }

    @Override
    public Optional<Pictograms> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Pictograms> getAll() {
        return repository.findAll();
    }

    @Override
    public Pictograms update(Integer id, Pictograms pictograms) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(pictograms.getName());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Pictograms not found"));
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
