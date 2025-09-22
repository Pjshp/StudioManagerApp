package com.example.studiomanagerapp_backend.dtos.massage;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MassageDto {
    private Integer id;
    private Double price;
    private Integer duration;
    private String type;
    private String workerName; // Worker name for display
    private Integer workerId;
}