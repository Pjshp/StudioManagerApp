package com.example.studiomanagerapp_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PassType {
    FOUR_CLASSES(4, 100, 56),
    EIGHT_CLASSES(8, 160, 84),
    TWELVE_CLASSES(12, 200, 112);

    private final int numberOfClasses;
    private final int price;
    private final int validityInDays;

    PassType(int numberOfClasses, int price, int validityInDays) {
        this.numberOfClasses = numberOfClasses;
        this.price = price;
        this.validityInDays = validityInDays;
    }

    public int getNumberOfClasses() {
        return numberOfClasses;
    }

    public int getPrice() {
        return price;
    }

    public int getValidityInDays() {
        return validityInDays;
    }
}
