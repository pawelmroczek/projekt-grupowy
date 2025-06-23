package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "pictures")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "url")
    private String url;
    @OneToOne
    @JoinColumn(name = "clothesId")
    private Clothes clothes;
}
