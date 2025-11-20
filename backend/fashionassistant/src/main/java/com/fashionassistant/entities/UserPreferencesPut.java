package com.fashionassistant.entities;

public record UserPreferencesPut(int minItemsPerLoad, boolean useTemperatureMatching,
                                 boolean useRestrictionMatching, int temperatureTolerance,
                                 boolean treatEmptyAsCompatible, boolean allowHandWashWithMachine,
                                 boolean allowDelicateWithNormal) {
}
