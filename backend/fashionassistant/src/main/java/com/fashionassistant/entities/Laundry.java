package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "laundries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Laundry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "date")
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household household;
    @ManyToMany
    @JoinTable(
            name = "laundry_clothes",
            joinColumns = @JoinColumn(name = "laundry_id"),
            inverseJoinColumns = @JoinColumn(name = "clothes_id")
    )
    private Set<Clothes> clothes;

    public void addClothes(Clothes newClothes) {
        if (clothes == null) {
            clothes = new HashSet<>();
        }
        clothes.add(newClothes);
    }
}
