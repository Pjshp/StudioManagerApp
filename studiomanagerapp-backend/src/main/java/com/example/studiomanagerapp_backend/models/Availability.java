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
@Table(name = "Availabilities")
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "AvailableDate", nullable = false)
    private String availableDate;

    @Column(name = "StartTime", nullable = false)
    private String startTime;

    @Column(name = "EndTime", nullable = false)
    private String endTime;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "ActivityId", nullable = false)
    private Activity activity;

}
