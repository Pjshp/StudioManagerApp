package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "MassageBookings") // Ustawienie nazwy tabeli w bazie danych
public class MassageBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false) // Klucz obcy do tabeli Users
    private User user; // Użytkownik, który dokonuje rezerwacji

    @ManyToOne
    @JoinColumn(name = "MassageId", nullable = false) // Klucz obcy do tabeli Massages
    private Massage massage; // Masaż, który jest rezerwowany

    @Column(name = "BookingDate", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime bookingDate; // Data rezerwacji

    @Column(name = "BookingTime", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime bookingTime; // Czas rezerwacji

    @Column(name = "Location", nullable = false, length = 255)
    private String location; // Lokalizacja masażu (np. adres studia)

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING) // Przechowywanie statusu jako stringa
    private BookingStatus status; // Status rezerwacji

}
