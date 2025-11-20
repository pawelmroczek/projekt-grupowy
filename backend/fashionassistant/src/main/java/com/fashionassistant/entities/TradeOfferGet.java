package com.fashionassistant.entities;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

public record TradeOfferGet(int id, int fromUser, String fromUserUsername, int toUser, String toUserUsername,
                            TradeOfferType type, LocalDate loanFinishDate, Set<ClothesGet> fromUserClothes,
                            Set<ClothesGet> toUserClothes) {
    public TradeOfferGet(TradeOffer tradeOffer) {
        this(tradeOffer.getId(), tradeOffer.getFromUser().getId(), tradeOffer.getFromUser().getUsername(),
                tradeOffer.getToUser().getId(), tradeOffer.getToUser().getUsername(), tradeOffer.getType(),
                tradeOffer.getLoanFinishDate(),
                tradeOffer.getFromUserClothes().stream().map(ClothesGet::new).collect(Collectors.toSet()),
                tradeOffer.getToUserClothes().stream().map(ClothesGet::new).collect(Collectors.toSet()));
    }
}
