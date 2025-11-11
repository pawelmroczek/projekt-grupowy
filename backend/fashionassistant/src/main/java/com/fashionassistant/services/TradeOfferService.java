package com.fashionassistant.services;

import com.fashionassistant.entities.TradeOffer;
import com.fashionassistant.entities.TradeOfferCreate;

import java.util.List;

public interface TradeOfferService {
    TradeOffer sendTradeOffer(TradeOfferCreate tradeOfferCreate);

    List<TradeOffer> getAllTradeOffers();

    void acceptTradeOffer(int tradeOfferId);

    //void rejectInvitation(int invitationId);
}
