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
@Table(name = "Massages") // Ustawienie nazwy tabeli w bazie danych
public class Massage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @Column(name = "Price", nullable = false)
    private Double price; // Cena masażu

    @Column(name = "Duration", nullable = false)
    private Integer duration; // Czas trwania masażu w minutach

    @Column(name = "Type", nullable = false, length = 100)
    private String type; // Nazwa masażu

    @ManyToOne
    @JoinColumn(name = "WorkerId", nullable = false) // Klucz obcy do tabeli Users
    private User worker; // Pracownik, który wykonuje masaż

}
