package com.fashionassistant.rest;

import com.fashionassistant.entities.TradeOfferCreate;
import com.fashionassistant.entities.TradeOfferGet;
import com.fashionassistant.services.TradeOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fashion/trade-offers")
@RequiredArgsConstructor
public class TradeOfferController {
    private final TradeOfferService tradeOfferService;

    @PostMapping("/send")
    public TradeOfferGet sendInvitation(@RequestBody TradeOfferCreate tradeOfferCreate) {
        return new TradeOfferGet(tradeOfferService.sendTradeOffer(tradeOfferCreate));
    }

    @GetMapping
    public List<TradeOfferGet> getAllTradeOffers() {
        return tradeOfferService.getAllTradeOffers().stream().map(TradeOfferGet::new).toList();
    }

    @PostMapping("/accept/{id}")
    public void acceptTradeOffer(@PathVariable int id) {
        tradeOfferService.acceptTradeOffer(id);
    }

    @PostMapping("/reject/{id}")
    public void rejectTrade(@PathVariable int id) {
        tradeOfferService.rejectTradeOffer(id);
    }
}
