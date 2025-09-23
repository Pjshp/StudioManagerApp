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
@Table(name = "Participants")
public class Participants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "LeaderId", nullable = false)
    private User leader;

    @ManyToMany
    @JoinTable(
        name = "Event_Attendees",
        joinColumns = @JoinColumn(name = "ParticipantsId"),
        inverseJoinColumns = @JoinColumn(name = "UserId")
    )
    private java.util.List<User> attendees;

    @ManyToMany
    @JoinTable(
        name = "Event_WaitingList",
        joinColumns = @JoinColumn(name = "ParticipantsId"),
        inverseJoinColumns = @JoinColumn(name = "UserId")
    )
    private java.util.List<User> waitingList;

    @ManyToOne
    @JoinColumn(name = "EventId", nullable = false)
    private Event event;

}
