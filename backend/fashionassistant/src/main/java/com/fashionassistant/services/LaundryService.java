package com.fashionassistant.services;

import com.fashionassistant.entities.LaundryGet;

import java.util.List;

public interface LaundryService {
    LaundryGet doLaundry(List<Integer> clothesIds);

    List<LaundryGet> getAllLaundries();
}
