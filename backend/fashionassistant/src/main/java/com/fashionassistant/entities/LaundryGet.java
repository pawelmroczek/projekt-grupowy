package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.Set;

public record LaundryGet(int id, LocalDate date, int userId, Set<ClothesGet> clothes) {
}
