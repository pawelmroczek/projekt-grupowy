package com.fashionassistant.rest;

import com.fashionassistant.entities.*;
import com.fashionassistant.repositories.HouseholdRepository;
import com.fashionassistant.repositories.InvitationRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
public class InvitationControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private HouseholdRepository householdRepository;
    @MockitoBean
    private AuthService authService;
    @Container
    @ServiceConnection
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0.44");
    private final ObjectMapper objectMapper = new ObjectMapper();
    private User testUser, user;
    private Invitation invitation, invitation1;
    private Household household;

    @BeforeEach
    public void setup() {
        objectMapper.registerModule(new JavaTimeModule());
        household = new Household(0, new HashSet<>(), new ArrayList<>());
        household = householdRepository.save(household);
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
        user = userRepository.save(user);
        invitation = new Invitation(0, user, testUser, "FRIENDS", 0);
        invitation1 = new Invitation(0, user, testUser, "HOUSEHOLDS", household.getId());
        testUser.addReceivedInvitation(invitation);
        testUser.addReceivedInvitation(invitation1);
        user.addSentInvitation(invitation);
        user.addSentInvitation(invitation1);
        invitation = invitationRepository.save(invitation);
        invitation1 = invitationRepository.save(invitation1);
        when(authService.getCurrentUser()).thenReturn(testUser);
    }

    @AfterEach
    public void teardown() {
        invitationRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @Test
    void shouldSentInvitation() throws Exception {
        InvitationCreate invitationCreate = new InvitationCreate(user.getId(), "FRIENDS");
        MvcResult result = mvc.perform(post("/fashion/invitations/send")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invitationCreate)))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        InvitationGet invitationGet = objectMapper.readValue(json, InvitationGet.class);
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertNotNull(invitationGet);
        Assertions.assertEquals(1, user.getReceivedInvitations().size());
        Assertions.assertEquals(1, testUser.getSentInvitations().size());
    }

    @Test
    void shouldReturnAllInvitations() throws Exception {
        MvcResult result = mvc.perform(get("/fashion/invitations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = result.getResponse().getContentAsString();
        List<InvitationGet> returnedInvitations = Arrays.asList(objectMapper.readValue(json, InvitationGet[].class));
        Assertions.assertEquals(2, returnedInvitations.size());
    }

    @Test
    @Transactional
    void shouldAcceptFriendInvitation() throws Exception {
        mvc.perform(post("/fashion/invitations/accept/{invitationId}", invitation.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertEquals(1, testUser.getFriends().size());
        Assertions.assertEquals(1, user.getFriends().size());
        Assertions.assertTrue(testUser.getFriends().contains(user));
        Assertions.assertTrue(user.getFriends().contains(testUser));
    }

    @Test
    @Transactional
    void shouldAcceptHouseholdInvitation() throws Exception {
        mvc.perform(post("/fashion/invitations/accept/{invitationId}", invitation1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        household = householdRepository.findById(household.getId()).orElseThrow();
        Assertions.assertNotNull(testUser.getHousehold());
        Assertions.assertEquals(1, household.getUsers().size());
    }

    @Test
    void shouldRejectInvitation() throws Exception {
        mvc.perform(post("/fashion/invitations/reject/{invitationId}", invitation1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        testUser = userRepository.findById(testUser.getId()).orElseThrow();
        user = userRepository.findById(user.getId()).orElseThrow();
        Assertions.assertEquals(1, testUser.getReceivedInvitations().size());
        Assertions.assertEquals(1, user.getSentInvitations().size());
    }
}
