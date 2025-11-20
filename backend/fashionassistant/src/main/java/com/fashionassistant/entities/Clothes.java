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
@Table(name = "clothes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Clothes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "category")
    private Integer category;
    @Column(name = "type")
    private String type;
    @Column(name = "color")
    private String color;
    @Column(name = "colorHex")
    private String colorHex;
    @Column(name = "size")
    private String size;
    @Column(name = "createdAt")
    private LocalDate createdAt;
    @Column(name = "clean")
    private boolean clean;
    @Column(name = "visible")
    private Integer visible;
    @Column(name = "priority")
    private int priority;
    @OneToOne(mappedBy = "clothes", cascade = CascadeType.ALL)
    private Picture picture;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @ManyToMany
    @JoinTable(
            name = "clothes_pictograms",
            joinColumns = @JoinColumn(name = "clothes_id"),
            inverseJoinColumns = @JoinColumn(name = "pictogram_id")
    )
    private Set<Pictograms> pictograms = new HashSet<>();

    @ManyToMany(mappedBy = "clothes")
    private Set<Laundry> laundries = new HashSet<>();

    @ManyToMany(mappedBy = "clothes")
    private Set<Outfit> outfits = new HashSet<>();

    @ElementCollection(targetClass = Season.class)
    @CollectionTable(
            name = "clothes_seasons",
            joinColumns = @JoinColumn(name = "clothes_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "season")
    private Set<Season> seasons = new HashSet<>();
    @Column(name = "loan_finish_date")
    private LocalDate loanFinishDate;
    @ManyToOne
    @JoinColumn(name = "loanUserId")
    private User loanUser;
}
