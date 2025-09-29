package com.example.studiomanagerapp_backend.dtos.room;

import com.example.studiomanagerapp_backend.models.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {
    private Integer id;
    private String name;
    private String location;
    private RoomType roomType;
}
