package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Event")
public class Event {
    @Id
    @GeneratedValue
    @Column(name = "Id")
    private Integer id;

    //add date field
    @Column(name = "EventDate", nullable = false)
    private LocalDate eventDate;

    @Column(name = "StartTime", nullable = false)
    private LocalTime startTime;

    @Column(name = "EndTime", nullable = false)
    private LocalTime endTime;

    @Column(name = "IsLoud", nullable = false)
    private Boolean isLoud;

    @ManyToOne
    @JoinColumn(name = "ActivityId", nullable = false)
    private Activity activity;

    @ManyToOne
    @JoinColumn(name = "RoomId", nullable = false)
    private Room room;
}
