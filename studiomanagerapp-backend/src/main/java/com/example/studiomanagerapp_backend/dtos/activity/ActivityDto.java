package com.example.studiomanagerapp_backend.dtos.activity;

import com.example.studiomanagerapp_backend.models.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDto {
    private Integer id;
    private String name;
    private String description;
    private Integer participantLimit;
    private RoomType roomType;
}
