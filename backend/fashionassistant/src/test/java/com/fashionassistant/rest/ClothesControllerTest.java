package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.repositories.*;
import com.fashionassistant.services.AuthService;
import com.fashionassistant.services.PictureService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class ClothesControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ClothesRepository clothesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HouseholdRepository householdRepository;
    @Autowired
    private OutfitRepository outfitRepository;
    @Autowired
    private PictureRepository pictureRepository;
    @MockitoBean
    private AuthService authService;
    @MockitoBean
    private PictureService pictureService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new ObjectMapper();
    private User testUser, user;
    private Clothes clothes, clothes1, clothes2, clothes3;
    private Outfit outfit;

    @BeforeEach
    public void setup() {
        objectMapper.registerModule(new JavaTimeModule());
        Household household = new Household(0, new HashSet<>(), new ArrayList<>());
        householdRepository.save(household);
        testUser = new User(
                0,
                "username",
                "user@gmail.com",
                "password",
                true,
                new ArrayList<>(),
                new ArrayList<>(),
                new HashSet<>(),
                household,
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
                household,
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
                LocalDate.now(), 0, testUser, new ArrayList<>(List.of(clothes)));
        outfitRepository.save(outfit);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @AfterEach
    public void tearDown() {
        pictureRepository.deleteAllInBatch();
        outfitRepository.deleteAllInBatch();
        clothesRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @Test
    void shouldCreateNewClothes() throws Exception {
        Mockito.when(pictureService.savePicture(any(MultipartFile.class)))
                .thenReturn(new Picture(0, "picture.jpg", "http://mock-server/picture.jpg", new Clothes()));
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.jpg",
                "image/jpeg",
                "file-content".getBytes()
        );
        mvc.perform(MockMvcRequestBuilders.multipart("/fashion/clothes")
                        .file(mockFile)
                        .param("name", "clothes")
                        .param("category", "1")
                        .param("type", "shirt")
                        .param("color", "black")
                        .param("colorHex", "000000")
                        .param("size", "S")
                        .param("clean", "true")
                        .param("visible", "1")
                        .param("priority", "1")
                        .param("seasons", "SUMMER", "WINTER"))
                .andExpect(status().isOk());
        Assertions.assertEquals(5, clothesRepository.count());
    }

    @Test
    void shouldToggleStatus() throws Exception {
        mvc.perform(post("/fashion/clothes/toggleStatus")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("[" + clothes.getId() + "]"))
                .andExpect(status().isOk());
        Clothes updatedClothes = clothesRepository.findById(clothes.getId()).orElseThrow();
        Assertions.assertFalse(updatedClothes.isClean());
    }

    @Test
    void shouldReturnLoanClothes() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/loan")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
        Assertions.assertEquals("clothes1", returnedClothes.get(0).name());
    }

    @Test
    void shouldReturnAllClothes() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(2, returnedClothes.size());
    }

    @Test
    void shouldReturnAllClothesWithPaging() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("page", "0")
                        .param("size", "1"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
    }

    @Test
    void shouldReturnAllClothesFromHousehold() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/household")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesHouseholdGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesHouseholdGet[].class));
        Assertions.assertEquals(4, returnedClothes.size());
    }

    @Test
    void shouldReturnClothesFromHouseholdByFilter() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/household/filtered")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("season", "SUMMER"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
        Assertions.assertEquals("clothes1", returnedClothes.get(0).name());
    }

    @Test
    void shouldReturnAllClothesFromFriends() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/friends")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(2, returnedClothes.size());
    }

    @Test
    void shouldReturnAllClothesFromFriendsWithPaging() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/friends")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("page", "0")
                        .param("size", "1"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
    }

    @Test
    void shouldReturnClothesFromFriendsByFilter() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/friends/filtered")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("season", "SUMMER"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
        Assertions.assertEquals("clothes1", returnedClothes.get(0).name());
    }

    @Test
    void shouldReturnAllPublicClothes() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/public")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(2, returnedClothes.size());
    }

    @Test
    void shouldReturnAllPublicClothesWithPaging() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/public")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("page", "0")
                        .param("size", "1"))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<ClothesGet> returnedClothes = Arrays.asList(objectMapper.readValue(json, ClothesGet[].class));
        Assertions.assertEquals(1, returnedClothes.size());
    }

    @Test
    void shouldUpdateClothes() throws Exception {
        Mockito.when(pictureService.savePicture(any(MultipartFile.class)))
                .thenReturn(new Picture(0, "picture.jpg", "http://mock-server/picture.jpg", new Clothes()));
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.jpg",
                "image/jpeg",
                "file-content".getBytes()
        );
        mvc.perform(MockMvcRequestBuilders.multipart("/fashion/clothes")
                        .file(mockFile)
                        .param("id", String.valueOf(clothes.getId()))
                        .param("name", "clothes4")
                        .param("category", "1")
                        .param("type", "jacket")
                        .param("color", "black")
                        .param("colorHex", "000000")
                        .param("size", "S")
                        .param("clean", "true")
                        .param("visible", "1")
                        .param("priority", "1")
                        .param("seasons", "SUMMER", "WINTER")
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                )
                .andExpect(status().isOk());
        Clothes updatedClothes = clothesRepository.findById(clothes.getId()).orElseThrow();
        Assertions.assertEquals("clothes4", updatedClothes.getName());
        Assertions.assertEquals("jacket", updatedClothes.getType());
    }

    @Test
    void shouldDeleteClothes() throws Exception {
        mvc.perform(delete("/fashion/clothes/{clothesId}", clothes.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        List<Clothes> clothes = clothesRepository.findClothesByUserId(testUser.getId());
        Assertions.assertEquals(1, clothes.size());
    }

    @Test
    void shouldReturnOutfitsWithClothesCount() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/clothes/{clothesId}/outfitsCount", clothes.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        int outfitsCount = Integer.parseInt(content);
        Assertions.assertEquals(1, outfitsCount);
    }
}
