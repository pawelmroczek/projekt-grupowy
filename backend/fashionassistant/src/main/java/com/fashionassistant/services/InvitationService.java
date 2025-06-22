package com.fashionassistant.services;

import com.fashionassistant.entities.InvitationCreate;
import com.fashionassistant.entities.InvitationGet;

import java.util.List;

public interface InvitationService {
    InvitationGet sendInvitation(InvitationCreate invitationCreate);

    List<InvitationGet> getAllInvitations();

    void acceptInvitation(int invitationId);

    void rejectInvitation(int invitationId);
}
