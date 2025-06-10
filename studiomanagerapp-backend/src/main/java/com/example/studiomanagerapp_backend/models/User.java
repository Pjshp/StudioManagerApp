package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Users") // Ustawienie nazwy tabeli w bazie danych
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @Column(name = "Email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "FirstName", nullable = false, length = 100)
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 100)
    private String lastName;

    @Column(name = "Password", nullable = false, length = 256)
    private String password; // Hasz hasła

    @Column(name = "PhoneNumber", length = 9)
    private String phoneNumber; // Numer telefonu

    @Column(name = "Role", nullable = false)
    @Enumerated(EnumType.STRING) // Przechowywanie roli jako stringa
    private Role role; // Rola użytkownika
}
