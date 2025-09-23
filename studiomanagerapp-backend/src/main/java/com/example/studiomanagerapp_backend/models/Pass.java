package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Passes")
public class Pass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @Column(name = "PassType", nullable = false)
    @Enumerated(EnumType.STRING)
    private PassType passType; // Typ karnetu

    @Column(name = "PurchaseDate", nullable = false)
    private LocalDate purchaseDate;

    @Column(name = "ClassesLeft", nullable = false)
    private Integer classesLeft;

    @Column(name = "ExpiryDate", nullable = false)
    private LocalDate expiryDate;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false) // Klucz obcy do tabeli Users
    private User user; // Użytkownik, do którego należy karnet
}
