package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Name", nullable = false, length = 1)
    private String name;

    @Column(name = "Location", nullable = false)
    @Enumerated(EnumType.STRING)
    private Locations location;

    @Column(name = "RoomType", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoomType roomType; // Typ pokoju
}
