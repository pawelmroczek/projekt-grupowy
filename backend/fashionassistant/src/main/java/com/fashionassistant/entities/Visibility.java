package com.fashionassistant.entities;

public enum Visibility {
    PRIVATE(0),
    FRIENDS(1),
    PUBLIC(2);

    private final int value;

    Visibility(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static Visibility fromValue(int value) {
        for (Visibility v : Visibility.values()) {
            if (v.getValue() == value) {
                return v;
            }
        }
        throw new IllegalArgumentException("Unknown visibility value: " + value);
    }
}