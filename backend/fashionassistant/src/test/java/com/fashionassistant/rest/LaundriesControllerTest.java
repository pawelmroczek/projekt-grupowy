package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.repositories.ClothesRepository;
import com.fashionassistant.repositories.LaundryRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class LaundriesControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LaundryRepository laundryRepository;
    @Autowired
    private ClothesRepository clothesRepository;
    @MockitoBean
    private AuthService authService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final ObjectMapper objectMapper = new ObjectMapper();
    private User testUser;
    private Clothes clothes;
    private Laundry laundry;

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
        clothes = new Clothes(0, "clothes", 1, "shirt",
                "black", "000000", "S", LocalDate.now(), false,
                0, 1, new Picture(), testUser, new HashSet<>(), new HashSet<>(),
                new HashSet<>(), new HashSet<>(Set.of(Season.SUMMER)), null, null);
        clothes = clothesRepository.save(clothes);
        laundry = new Laundry(0, LocalDate.now(), testUser, testUser.getHousehold(), Set.of(clothes));
        testUser.addLaundry(laundry);
        laundry = laundryRepository.save(laundry);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @AfterEach
    public void teardown() {
        laundryRepository.deleteAllInBatch();
        clothesRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @Test
    void shouldReturnAllLaundries() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/laundries")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<LaundryGet> returnedLaundries = Arrays.asList(objectMapper.readValue(json, LaundryGet[].class));
        Assertions.assertEquals(1, returnedLaundries.size());
    }

    @Test
    @Transactional
    void shouldDoLaundry() throws Exception {
        MvcResult result = mvc.perform(post("/fashion/laundries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("[" + clothes.getId() + "]"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        LaundryGet returnedLaundry = objectMapper.readValue(json, LaundryGet.class);
        Laundry laundry1 = laundryRepository.findById(returnedLaundry.id()).orElseThrow();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        clothes = clothesRepository.findById(clothes.getId()).orElseThrow();
        Assertions.assertNotNull(returnedLaundry);
        Assertions.assertEquals(2, testUser.getLaundries().size());
        Assertions.assertTrue(clothes.isClean());
        Assertions.assertTrue(testUser.getLaundries().contains(laundry1));
    }
}
