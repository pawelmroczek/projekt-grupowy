package com.fashionassistant.rest;

import com.fashionassistant.entities.TradeOfferCreate;
import com.fashionassistant.entities.TradeOfferGet;
import com.fashionassistant.services.TradeOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fashion/trade-offers")
@RequiredArgsConstructor
public class TradeOfferController {
    private final TradeOfferService tradeOfferService;

    @PostMapping("/send")
    public TradeOfferGet sendInvitation(@RequestBody TradeOfferCreate tradeOfferCreate) {
        return new TradeOfferGet(tradeOfferService.sendTradeOffer(tradeOfferCreate));
    }
}
