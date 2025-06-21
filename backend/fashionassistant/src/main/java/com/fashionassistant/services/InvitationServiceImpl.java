package com.fashionassistant.services;

import com.fashionassistant.entities.*;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.HouseholdRepository;
import com.fashionassistant.repositories.InvitationRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final HouseholdRepository householdRepository;

    @Override
    public InvitationGet sendInvitation(InvitationCreate invitationCreate) {
        User toUser = userRepository.findById(invitationCreate.toUser())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User fromUser = authService.getCurrentUser();
        if (toUser.getId() == fromUser.getId()) {
            throw new BadRequestException("You can't send invitation to yourself");
        }
        Invitation invitation = new Invitation(0, fromUser, toUser, invitationCreate.type(), 0);
        if (invitation.getType().equals("HOUSEHOLDS")) {
            Household household;
            if (fromUser.getHousehold() == null) {
                household= householdRepository.save(new Household( 0, new HashSet<>(Set.of(fromUser))));
                fromUser.setHousehold(household);
            }
            else {
                household = householdRepository.findById(fromUser.getHousehold().getId())
                        .orElseThrow(() -> new NotFoundException("Household not found"));
            }
            invitation.setHouseholdId(household.getId());
        }
        invitation = invitationRepository.save(invitation);
        toUser.addReceivedInvitation(invitation);
        fromUser.addSentInvitation(invitation);
        return new InvitationGet(invitation.getId(), invitation.getFromUser().getId(),
                invitation.getFromUser().getUsername(),
                invitation.getToUser().getId(), invitation.getType());
    }

    @Override
    public List<InvitationGet> getAllInvitations() {
        User currentUser = authService.getCurrentUser();
        List<Invitation> invitations = currentUser.getReceivedInvitations();
        List<InvitationGet> invitationsGet = new ArrayList<>();
        invitations.forEach(
                invitation -> {
                    invitationsGet.add(
                            new InvitationGet(
                                    invitation.getId(),
                                    invitation.getFromUser().getId(),
                                    invitation.getFromUser().getUsername(),
                                    invitation.getToUser().getId(),
                                    invitation.getType()
                            )
                    );
                }
        );
        return invitationsGet;
    }

    @Override
    public void acceptInvitation(int invitationId) {
        Invitation invitation = getInvitationById(invitationId);
        User fromUser = userRepository.findById(invitation.getFromUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User toUser = userRepository.findById(invitation.getToUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (invitation.getType().equals("FRIENDS")) {
            fromUser.addFriend(toUser);
            toUser.addFriend(fromUser);
        }
        if (invitation.getType().equals("HOUSEHOLDS")) {
            Household household = householdRepository.findById(fromUser.getHousehold().getId())
                    .orElseThrow(() -> new NotFoundException("Household not found"));
            if (toUser.getHousehold() != null) {
                Household actualHousehold = householdRepository
                        .findById(toUser.getHousehold().getId())
                        .orElseThrow(() -> new NotFoundException("Household not found"));
                actualHousehold.getUsers().remove(toUser);
                householdRepository.save(actualHousehold);
            }
            toUser.setHousehold(household);
            household.addUser(toUser);
        }
        fromUser.deleteInvitation(invitation);
        toUser.deleteInvitation(invitation);
        invitation.setToUser(null);
        invitation.setFromUser(null);
        invitationRepository.deleteById(invitationId);
    }

    @Override
    public void rejectInvitation(int invitationId) {
        Invitation invitation = getInvitationById(invitationId);
        User fromUser = userRepository.findById(invitation.getFromUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User toUser = userRepository.findById(invitation.getToUser().getId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        fromUser.deleteInvitation(invitation);
        toUser.deleteInvitation(invitation);
        invitation.setToUser(null);
        invitation.setFromUser(null);
        invitationRepository.deleteById(invitationId);
    }

    private Invitation getInvitationById(int invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new NotFoundException("Invitation not found"));
        User currentUser = authService.getCurrentUser();
        if (currentUser.getId() != invitation.getToUser().getId()) {
            throw new BadRequestException("You don't have access to this invitation");
        }
        return invitation;
    }
}
