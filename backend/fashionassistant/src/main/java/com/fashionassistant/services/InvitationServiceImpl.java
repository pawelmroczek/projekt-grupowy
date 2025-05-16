package com.fashionassistant.services;

import com.fashionassistant.entities.Invitation;
import com.fashionassistant.entities.InvitationCreate;
import com.fashionassistant.entities.InvitationGet;
import com.fashionassistant.entities.User;
import com.fashionassistant.exceptions.BadRequestException;
import com.fashionassistant.exceptions.NotFoundException;
import com.fashionassistant.repositories.InvitationRepository;
import com.fashionassistant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    @Override
    public InvitationGet sendInvitation(InvitationCreate invitationCreate) {
        User toUser = userRepository.findById(invitationCreate.toUser())
                .orElseThrow(() -> new NotFoundException("User not found"));
        User fromUser = authService.getCurrentUser();
        if (toUser.getId() == fromUser.getId()) {
            throw new BadRequestException("You can't send invitation to yourself");
        }
        Invitation invitation = new Invitation(0, fromUser, toUser, invitationCreate.type());
        invitation = invitationRepository.save(invitation);
        return new InvitationGet(invitation.getId(), invitation.getFromUser().getId(),
                invitation.getToUser().getId(), invitation.getType());
    }
}
