package com.fashionassistant.services;

import com.fashionassistant.entities.TradeOffer;
import com.fashionassistant.entities.TradeOfferCreate;

public interface TradeOfferService {
    TradeOffer sendTradeOffer(TradeOfferCreate tradeOfferCreate);

    //List<InvitationGet> getAllInvitations();

    //void acceptInvitation(int invitationId);

    //void rejectInvitation(int invitationId);
}
