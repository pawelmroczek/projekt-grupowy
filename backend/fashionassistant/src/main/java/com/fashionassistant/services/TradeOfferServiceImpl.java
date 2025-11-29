package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.TradeOfferRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
                LocalDateTime.now(),
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
        if (tradeOffer.getType() == TradeOfferType.TRADE) {
            trade(tradeOffer, fromUser, toUser);
            Set<Integer> clothesInTrade = Stream.concat(tradeOffer.getFromUserClothes().stream(),
                            tradeOffer.getToUserClothes().stream())
                    .map(Clothes::getId).collect(Collectors.toSet());
            deleteTradeOffersWithClothesIds(clothesInTrade, fromUser, toUser);
        }
        if (tradeOffer.getType() == TradeOfferType.LOAN) {
            loan(tradeOffer, fromUser, toUser);
            fromUser.deleteTradeOffer(tradeOffer);
            toUser.deleteTradeOffer(tradeOffer);
            tradeOfferRepository.delete(tradeOffer);
        }
    }

    @Override
    public void rejectTradeOffer(int tradeOfferId) {
        TradeOffer tradeOffer = getTradeOfferById(tradeOfferId);
        User fromUser = userRepository.findById(tradeOffer.getFromUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User toUser = userRepository.findById(tradeOffer.getToUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        fromUser.deleteTradeOffer(tradeOffer);
        toUser.deleteTradeOffer(tradeOffer);
        tradeOfferRepository.delete(tradeOffer);
    }

    @Scheduled(cron = "0 0 0 * * *")
    private void getBackClothesFromLoan() {
        List<Clothes> clothes = clothesRepository.findAll();
        clothes.forEach(singleClothes -> {
            LocalDate finishDate = singleClothes.getLoanFinishDate();
            if (finishDate != null && finishDate.isBefore(LocalDate.now())) {
                singleClothes.setLoanFinishDate(null);
                User user = singleClothes.getUser();
                user.deleteLoanClothes(singleClothes);
                singleClothes.setLoanUser(null);
                userRepository.save(user);
            }
        });
    }

    @Scheduled(cron = "0 0 0 * * *")
    private void removeTradeOffers() {
        List<TradeOffer> tradeOffers = tradeOfferRepository.findAll();
        tradeOffers.forEach(tradeOffer -> {
            LocalDateTime createdAt = tradeOffer.getCreatedAt().plusDays(1);
            if (createdAt.isBefore(LocalDateTime.now())) {
                tradeOffer.setFromUser(null);
                tradeOffer.setToUser(null);
                tradeOfferRepository.delete(tradeOffer);
            }
        });
    }

    private void deleteTradeOffersWithClothesIds(Set<Integer> clothesIds, User fromUser, User toUser) {
        List<TradeOffer> tradeOffers = tradeOfferRepository.findAll();
        List<TradeOffer> toDelete = tradeOffers.stream()
                .filter(offer -> offer.getFromUserClothes().stream()
                        .anyMatch(clothes -> clothesIds.contains(clothes.getId())) ||
                        offer.getToUserClothes().stream().anyMatch(clothes -> clothesIds.contains(clothes.getId())))
                .toList();
        toDelete.forEach(fromUser::deleteTradeOffer);
        toDelete.forEach(toUser::deleteTradeOffer);
        tradeOfferRepository.deleteAll(toDelete);
    }

    private void loan(TradeOffer tradeOffer, User fromUser, User toUser) {
        tradeOffer.getFromUserClothes().forEach(clothes -> {
            toUser.addLoanClothes(clothes);
            clothes.setLoanUser(toUser);
            clothes.setLoanFinishDate(tradeOffer.getLoanFinishDate());
        });
        tradeOffer.getToUserClothes().forEach(clothes -> {
            fromUser.addLoanClothes(clothes);
            clothes.setLoanUser(fromUser);
            clothes.setLoanFinishDate(tradeOffer.getLoanFinishDate());
        });
    }

    private void trade(TradeOffer tradeOffer, User fromUser, User toUser) {
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
