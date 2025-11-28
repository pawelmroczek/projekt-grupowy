package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "trade_offers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TradeOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "fromUserId")
    private User fromUser;
    @ManyToOne
    @JoinColumn(name = "toUserId")
    private User toUser;
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TradeOfferType type;
    @Column(name = "loan_finish_date")
    private LocalDate loanFinishDate;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @ManyToMany
    @JoinTable(
            name = "trade_from_user_clothes",
            joinColumns = @JoinColumn(name = "trade_id"),
            inverseJoinColumns = @JoinColumn(name = "from_user_clothes_id")
    )
    private Set<Clothes> fromUserClothes;
    @ManyToMany
    @JoinTable(
            name = "trade_to_user_clothes",
            joinColumns = @JoinColumn(name = "trade_id"),
            inverseJoinColumns = @JoinColumn(name = "to_user_clothes_id")
    )
    private Set<Clothes> toUserClothes;
}
