package com.fashionassistant.entities;

public record UserPreferencesGet(int id, int minItemsPerLoad, boolean useTemperatureMatching,
                                 boolean useRestrictionMatching, int temperatureTolerance,
                                 boolean treatEmptyAsCompatible, boolean allowHandWashWithMachine,
                                 boolean allowDelicateWithNormal) {

    public UserPreferencesGet(UserPreferences userPreferences) {
        this(userPreferences.getId(), userPreferences.getMinItemsPerLoad(),
                userPreferences.isUseTemperatureMatching(), userPreferences.isUseRestrictionMatching(),
                userPreferences.getTemperatureTolerance(), userPreferences.isTreatEmptyAsCompatible(),
                userPreferences.isAllowHandWashWithMachine(), userPreferences.isAllowDelicateWithNormal());
    }
}
