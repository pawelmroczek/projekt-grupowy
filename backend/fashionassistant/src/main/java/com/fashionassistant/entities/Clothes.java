package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    @Column(name = "type")
    private String type;
    @Column(name = "color")
    private String color;
    @Column(name = "size")
    private String size;
    @Column(name = "createdAt")
    private LocalDate createdAt;
    @Column(name = "clean")
    private boolean clean;
    @Column(name = "visible")
    private boolean visible;
    @Column(name = "priority")
    private int priority;
    @OneToOne(mappedBy = "clothes", cascade = CascadeType.ALL)
    private Picture picture;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
