package com.fashionassistant.rest;

import com.fashionassistant.entities.InvitationCreate;
import com.fashionassistant.entities.InvitationGet;
import com.fashionassistant.services.InvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("fashion/invitations")
@RequiredArgsConstructor
public class InvitationController {
    private final InvitationService invitationService;

    @PostMapping("/send")
    public InvitationGet sendInvitation(@RequestBody InvitationCreate invitationCreate) {
        return invitationService.sendInvitation(invitationCreate);
    }

    @PostMapping("/accept/{id}")
    public void acceptInvitation(@PathVariable int id) {
        invitationService.acceptInvitation(id);
    }

    @PostMapping("/reject/{id}")
    public void rejectInvitation(@PathVariable int id) {
        invitationService.rejectInvitation(id);
    }
}
