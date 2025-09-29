package com.example.studiomanagerapp_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ToString(exclude = "user")
@EqualsAndHashCode(exclude = "user")
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
    @JsonBackReference
    private User user; // Użytkownik, do którego należy karnet
}
