package com.fashionassistant.rest;

import com.fashionassistant.entities.User;
import com.fashionassistant.entities.UserFriendGet;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class FriendControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @MockitoBean
    private AuthService authService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new ObjectMapper();
    private User testUser, user, user1;

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
        user1 = new User(
                0,
                "username",
                "user3@gmail.com",
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
        user1.addFriend(testUser);
        user1 = userRepository.save(user1);
        testUser.addFriend(user1);
        testUser = userRepository.save(testUser);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @AfterEach
    public void teardown() {
        userRepository.deleteAllInBatch();
    }

    @Test
    void shouldReturnAllFriends() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/friends")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<UserFriendGet> returnedUsers = Arrays.asList(objectMapper.readValue(json, UserFriendGet[].class));
        Assertions.assertEquals(2, returnedUsers.size());
    }

    @Test
    @Transactional
    void shouldRemoveFriend() throws Exception {
        mvc.perform(delete("/fashion/friends/{friendId}", user.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        Assertions.assertEquals(1, testUser.getFriends().size());
    }
}
