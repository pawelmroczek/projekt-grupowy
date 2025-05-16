package com.fashionassistant.services;

import com.fashionassistant.entities.InvitationCreate;
import com.fashionassistant.entities.InvitationGet;

public interface InvitationService {
    InvitationGet sendInvitation(InvitationCreate invitationCreate);

    void acceptInvitation(int invitationId);

    void rejectInvitation(int invitationId);
}
