package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "outfits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Outfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    // Stylizacja należy do użytkownika
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // Stylizacja składa się z wielu ubrań
    @ManyToMany
    @JoinTable(
        name = "outfit_clothes",
        joinColumns = @JoinColumn(name = "outfit_id"),
        inverseJoinColumns = @JoinColumn(name = "clothes_id")
    )
    private List<Clothes> clothes;
}
