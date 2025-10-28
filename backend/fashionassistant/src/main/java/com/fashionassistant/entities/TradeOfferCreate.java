package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.Set;

public record TradeOfferCreate(int toUser, String type, LocalDate loanFinishDate,
                               Set<Integer> fromUserClothesIds, Set<Integer> toUserClothesIds) {
}
