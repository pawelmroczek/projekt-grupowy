package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.services.PictogramsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/fashion/pictograms")
public class PictogramsController {

    private final PictogramsService service;

    public PictogramsController(PictogramsService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pictograms> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pictograms> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pictograms createOrUpdate(@RequestBody Pictograms pictograms) {
        return service.createOrUpdate(pictograms);
    }

    @PutMapping("/{id}")
    public Pictograms update(@PathVariable Integer id, @RequestBody Pictograms pictograms) {
        return service.update(id, pictograms);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
