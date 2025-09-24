package com.example.studiomanagerapp_backend.dtos.pass;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PassTypeDto {
    private String name;
    private int numberOfClasses;
    private int price;
    private int validityInDays;
}
