package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "households")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Household {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @OneToMany(mappedBy = "household")
    private Set<User> users;

    public void addUser(User user){
        if(users == null){
            users = new HashSet<>();
        }
        users.add(user);
    }
}
