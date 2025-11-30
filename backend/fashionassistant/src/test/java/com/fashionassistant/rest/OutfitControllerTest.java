package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.OutfitRepository;
import com.fashionassistant.repositories.UserRepository;
import com.fashionassistant.services.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
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
import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class OutfitControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OutfitRepository outfitRepository;
    @Autowired
    private ClothesRepository clothesRepository;
    @MockitoBean
    private AuthService authService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final ObjectMapper objectMapper = new ObjectMapper();
    private User testUser, user;
    private Clothes clothes, clothes1, clothes2, clothes3;
    private Outfit outfit, outfit1;

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
        outfit = new Outfit(0, "outfit", "casual",
                LocalDate.now(), 0, testUser, new ArrayList<>(List.of(clothes, clothes2)));
        outfit1 = new Outfit(0, "outfit1", "casual",
                LocalDate.now(), 2, user, new ArrayList<>(List.of(clothes1, clothes3)));
        testUser.addOutfit(outfit);
        user.addOutfit(outfit1);
        outfitRepository.save(outfit);
        outfitRepository.save(outfit1);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @AfterEach
    public void teardown() {
        outfitRepository.deleteAllInBatch();
        clothesRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @Test
    @Transactional
    void shouldAddOutfit() throws Exception {
        OutfitCreate outfitCreate = new OutfitCreate("newOutfit",
                "outfit", 0, List.of(clothes.getId(), clothes2.getId()));
        MvcResult result = mvc.perform(post("/fashion/outfits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(outfitCreate)))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        OutfitGet createdOutfit = objectMapper.readValue(json, OutfitGet.class);
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        Assertions.assertEquals("newOutfit", createdOutfit.name());
        Assertions.assertEquals(2, testUser.getOutfits().size());
    }

    @Test
    void shouldReturnAllOutfits() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/outfits")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<OutfitGet> returnedOutfits = Arrays.asList(objectMapper.readValue(json, OutfitGet[].class));
        Assertions.assertEquals(1, returnedOutfits.size());
    }

    @Test
    void shouldReturnAllOutfitsFromFriends() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/outfits/friends")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<OutfitGet> returnedOutfits = Arrays.asList(objectMapper.readValue(json, OutfitGet[].class));
        Assertions.assertEquals(1, returnedOutfits.size());
    }

    @Test
    void shouldReturnAllPublicOutfits() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/outfits/public")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<OutfitGet> returnedOutfits = Arrays.asList(objectMapper.readValue(json, OutfitGet[].class));
        Assertions.assertEquals(1, returnedOutfits.size());
    }

    @Test
    void shouldUpdateOutfit() throws Exception {
        OutfitUpdate outfitUpdate = new OutfitUpdate(
                outfit.getId(), "outfitUpdated", "casual",
                0, new ArrayList<>(List.of(clothes.getId(), clothes2.getId()))
        );
        mvc.perform(put("/fashion/outfits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(outfitUpdate)))
                .andExpect(status().isOk())
                .andReturn();
        Outfit updatedOutfit = outfitRepository.findById(outfit.getId()).orElseThrow();
        Assertions.assertEquals("outfitUpdated", updatedOutfit.getName());
    }

    @Test
    @Transactional
    void shouldDeleteOutfit() throws Exception {
        mvc.perform(delete("/fashion/outfits/{outfitId}", outfit.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        Assertions.assertEquals(0, testUser.getOutfits().size());
    }
}
