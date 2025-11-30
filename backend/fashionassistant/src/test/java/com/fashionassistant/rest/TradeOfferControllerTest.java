package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.TradeOfferRepository;
import com.fashionassistant.repositories.UserRepository;
import com.fashionassistant.services.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class TradeOfferControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClothesRepository clothesRepository;
    @Autowired
    private TradeOfferRepository tradeOfferRepository;
    @MockitoBean
    private AuthService authService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final ObjectMapper objectMapper = new ObjectMapper();
    private User testUser, user;
    private Clothes clothes, clothes1, clothes2, clothes3;
    private TradeOffer tradeOffer, tradeOffer1;

    @BeforeEach
    public void setup() {
        objectMapper.registerModule(new JavaTimeModule());
        testUser = new User(
                0,
                "username",
                "user@gmail.com",
                "password",
                true,
                new ArrayList<>(),
                new ArrayList<>(),
                new HashSet<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null
        );
        testUser = userRepository.save(testUser);
        user = new User(
                0,
                "username",
                "user2@gmail.com",
                "password",
                true,
                new ArrayList<>(),
                new ArrayList<>(),
                new HashSet<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null
        );
        user.addFriend(testUser);
        testUser.addFriend(user);
        user = userRepository.save(user);
        testUser = userRepository.save(testUser);
        clothes = new Clothes(0, "clothes", 1, "shirt",
                "black", "000000", "S", LocalDate.now(), true,
                0, 1, new Picture(), testUser, new HashSet<>(), new HashSet<>(),
                new HashSet<>(), new HashSet<>(Set.of(Season.SUMMER)), null, null);
        clothes1 = new Clothes(0, "clothes1", 1, "shirt",
                "black", "000000", "S", LocalDate.now(), true,
                2, 1, new Picture(), user, new HashSet<>(), new HashSet<>(),
                new HashSet<>(), new HashSet<>(Set.of(Season.SUMMER)), null, testUser);
        clothes2 = new Clothes(0, "clothes2", 1, "shirt",
                "black", "000000", "S", LocalDate.now(), true,
                2, 1, new Picture(), testUser, new HashSet<>(), new HashSet<>(),
                new HashSet<>(), new HashSet<>(), null, null);
        clothes3 = new Clothes(0, "clothes1", 1, "shirt",
                "black", "000000", "S", LocalDate.now(), true,
                2, 1, new Picture(), user, new HashSet<>(), new HashSet<>(),
                new HashSet<>(), new HashSet<>(), null, null);
        clothes = clothesRepository.save(clothes);
        clothes1 = clothesRepository.save(clothes1);
        clothes2 = clothesRepository.save(clothes2);
        clothes3 = clothesRepository.save(clothes3);
        tradeOffer = new TradeOffer(0, user, testUser, TradeOfferType.TRADE,
                null, LocalDateTime.now(), Set.of(clothes1, clothes3), Set.of(clothes));
        tradeOffer1 = new TradeOffer(0, user, testUser, TradeOfferType.LOAN,
                LocalDate.now().plusWeeks(1), LocalDateTime.now(), Set.of(), Set.of(clothes));
        testUser.addReceivedTradeOffer(tradeOffer);
        testUser.addReceivedTradeOffer(tradeOffer1);
        user.addSentTradeOffer(tradeOffer);
        user.addSentTradeOffer(tradeOffer1);
        tradeOffer = tradeOfferRepository.save(tradeOffer);
        tradeOffer1 = tradeOfferRepository.save(tradeOffer1);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @Test
    void shouldSendTradeOffer() throws Exception {
        TradeOfferCreate tradeOfferCreate = new TradeOfferCreate(
                user.getId(), TradeOfferType.TRADE, null,
                Set.of(clothes.getId()), Set.of(clothes1.getId())
        );
        MvcResult result = mvc.perform(post("/fashion/trade-offers/send")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tradeOfferCreate)))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        TradeOfferGet tradeOfferGet = objectMapper.readValue(json, TradeOfferGet.class);
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertNotNull(tradeOfferGet);
        Assertions.assertEquals(1, user.getReceivedTrades().size());
        Assertions.assertEquals(1, testUser.getSentTrades().size());
    }

    @Test
    @Transactional
    void shouldReturnAllTradeOffers() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/trade-offers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<TradeOfferGet> returnedTradeOffers = Arrays.asList(objectMapper.readValue(json, TradeOfferGet[].class));
        Assertions.assertEquals(2, returnedTradeOffers.size());
    }

    @Test
    void shouldAcceptTradeOffer() throws Exception {
        mvc.perform(post("/fashion/trade-offers/accept/{tradeOfferId}", tradeOffer.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertEquals(3, testUser.getClothes().size());
        Assertions.assertEquals(1, user.getClothes().size());
    }

    @Test
    void shouldAcceptLoanOffer() throws Exception {
        mvc.perform(post("/fashion/trade-offers/accept/{tradeOfferId}", tradeOffer1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        user = userRepository.findById(user.getId()).orElseThrow();
        clothes = clothesRepository.findById(clothes.getId()).orElseThrow();
        Assertions.assertEquals(1, user.getLoanClothes().size());
        Assertions.assertEquals(user.getId(), clothes.getLoanUser().getId());
    }

    @Test
    void shouldRejectTradeOffer() throws Exception {
        mvc.perform(post("/fashion/trade-offers/reject/{tradeOfferId}", tradeOffer.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertEquals(1, testUser.getReceivedTrades().size());
        Assertions.assertEquals(1, user.getSentTrades().size());
    }
}
