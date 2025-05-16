package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Clothes> clothes;
    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<User> friends;
    @ManyToOne
    @JoinColumn(name = "householdId")
    private Household household;
    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Invitation> sentInvitations;
    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Invitation> receivedInvitations;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void addClothes(Clothes newClothes) {
        if (clothes == null) {
            clothes = new ArrayList<>();
        }
        clothes.add(newClothes);
    }

    public void addSentInvitation(Invitation invitation) {
        if (invitation == null) {
            sentInvitations = new ArrayList<>();
        }
        sentInvitations.add(invitation);
    }

    public void addReceivedInvitation(Invitation invitation) {
        if (invitation == null) {
            receivedInvitations = new ArrayList<>();
        }
        receivedInvitations.add(invitation);
    }

    public void deleteInvitation(Invitation invitation) {
        if (sentInvitations != null) {
            sentInvitations.remove(invitation);
        }
        if (receivedInvitations != null) {
            receivedInvitations.remove(invitation);
        }
    }
}
