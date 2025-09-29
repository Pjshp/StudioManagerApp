package com.example.studiomanagerapp_backend.dtos.event;

import com.example.studiomanagerapp_backend.dtos.activity.ActivityDto;
import com.example.studiomanagerapp_backend.dtos.room.RoomDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private Integer id;
    private LocalDate eventDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Boolean isLoud;
    private ActivityDto activity;
    private RoomDto room;
}
