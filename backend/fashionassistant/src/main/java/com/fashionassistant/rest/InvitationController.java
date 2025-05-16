package com.fashionassistant.rest;

import com.fashionassistant.entities.InvitationCreate;
import com.fashionassistant.entities.InvitationGet;
import com.fashionassistant.services.InvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fashion/invitations")
@RequiredArgsConstructor
public class InvitationController {
    private final InvitationService invitationService;

    @PostMapping("/send")
    public InvitationGet sendInvitation(@RequestBody InvitationCreate invitationCreate) {
        return invitationService.sendInvitation(invitationCreate);
    }
}
