package com.fashionassistant.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_preferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "min_items_per_load")
    private int minItemsPerLoad;
    @Column(name = "use_temperature_matching")
    private boolean useTemperatureMatching;
    @Column(name = "use_restriction_matching")
    private boolean useRestrictionMatching;
    @Column(name = "temeprature_tolerance")
    private int temperatureTolerance;
    @Column(name = "treat_empty_as_compatible")
    private boolean treatEmptyAsCompatible;
    @Column(name = "allow_hand_wash_with_machine")
    private boolean allowHandWashWithMachine;
    @Column(name = "allow_delicate_with_normal")
    private boolean allowDelicateWithNormal;
    @OneToOne(mappedBy = "userPreferences", cascade = CascadeType.ALL)
    private User user;

    public UserPreferences(int id, UserPreferencesPut userPreferencesPut, User user) {
        this.id = id;
        this.minItemsPerLoad = userPreferencesPut.minItemsPerLoad();
        this.useTemperatureMatching = userPreferencesPut.useTemperatureMatching();
        this.useRestrictionMatching = userPreferencesPut.useRestrictionMatching();
        this.temperatureTolerance = userPreferencesPut.temperatureTolerance();
        this.treatEmptyAsCompatible = userPreferencesPut.treatEmptyAsCompatible();
        this.allowHandWashWithMachine = userPreferencesPut.allowHandWashWithMachine();
        this.allowDelicateWithNormal = userPreferencesPut.allowDelicateWithNormal();
        this.user = user;
    }
}
