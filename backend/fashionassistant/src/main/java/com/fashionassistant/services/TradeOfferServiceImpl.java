package com.fashionassistant.services;

import com.fashionassistant.entities.Clothes;
import com.fashionassistant.entities.TradeOffer;
import com.fashionassistant.entities.TradeOfferCreate;
import com.fashionassistant.entities.User;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.TradeOfferRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TradeOfferServiceImpl implements TradeOfferService {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final TradeOfferRepository tradeOfferRepository;

    @Override
    public TradeOffer sendTradeOffer(TradeOfferCreate tradeOfferCreate) {
        User toUser = userRepository.findById(tradeOfferCreate.toUser())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User fromUser = authService.getCurrentUser();
        if (toUser.getId() == fromUser.getId()) {
            throw new BadRequestException("You can't send trade offer to yourself");
        }
        fromUser = userRepository.findById(fromUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        TradeOffer tradeOffer = new TradeOffer(
                0,
                fromUser,
                toUser,
                tradeOfferCreate.type(),
                tradeOfferCreate.loanFinishDate(),
                getSetOfClothesByIds(tradeOfferCreate.fromUserClothesIds(), fromUser.getId()),
                getSetOfClothesByIds(tradeOfferCreate.toUserClothesIds(), toUser.getId())
        );
        tradeOfferRepository.save(tradeOffer);
        fromUser.addSentTradeOffer(tradeOffer);
        toUser.addReceivedTradeOffer(tradeOffer);
        return tradeOffer;
    }

    @Override
    public List<TradeOffer> getAllTradeOffers() {
        User currentUser = authService.getCurrentUser();
        currentUser = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        return currentUser.getReceivedTrades();
    }

    @Override
    public void acceptTradeOffer(int tradeOfferId) {
        TradeOffer tradeOffer = getTradeOfferById(tradeOfferId);
        User fromUser = userRepository.findById(tradeOffer.getFromUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User toUser = userRepository.findById(tradeOffer.getToUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        tradeOffer.getFromUserClothes().forEach(clothes -> {
            clothes.setUser(toUser);
            toUser.addClothes(clothes);
            fromUser.getClothes().remove(clothes);
        });
        tradeOffer.getToUserClothes().forEach(clothes -> {
            clothes.setUser(fromUser);
            fromUser.addClothes(clothes);
            toUser.getClothes().remove(clothes);
        });
        fromUser.deleteTradeOffer(tradeOffer);
        toUser.deleteTradeOffer(tradeOffer);
        tradeOffer.setFromUserClothes(null);
        tradeOffer.setToUserClothes(null);
        tradeOfferRepository.delete(tradeOffer);
    }

    private Set<Clothes> getSetOfClothesByIds(Set<Integer> clothesIds, int userId) {
        return clothesIds.stream().map(
                clothesId -> {
                    Clothes clothes = clothesRepository.findById(clothesId)
                            .orElseThrow(() -> new BadRequestException("Clothes not found"));
                    if (clothes.getUser().getId() != userId) {
                        throw new BadRequestException("Clothes doesn't belong to user");
                    }
                    return clothes;
                }
        ).collect(Collectors.toSet());
    }

    private TradeOffer getTradeOfferById(int tradeOfferId) {
        TradeOffer tradeOffer = tradeOfferRepository.findById(tradeOfferId)
                .orElseThrow(() -> new NotFoundException("Trade offer not found"));
        User currentUser = authService.getCurrentUser();
        if (currentUser.getId() != tradeOffer.getToUser().getId()) {
            throw new BadRequestException("You don't have access to this trade offer");
        }
        return tradeOffer;
    }
}
