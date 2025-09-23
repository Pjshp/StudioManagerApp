package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Pattern;

import java.time.MonthDay;
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
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @Column(name = "FirstName", nullable = false, length = 100)
    @Pattern(regexp = "^[A-Za-z]+$", message = "First name must contain only alphabetic characters.")
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 100)
    //add pattern for last name to contain only alphabetic characters but eventually hyphen or space
    @Pattern(regexp = "^[A-Za-z]+([ '-][A-Za-z]+)*$", message = "Last name must contain only alphabetic characters, spaces, hyphens, or apostrophes.")
    private String lastName;

    @Column(name = "Password", nullable = false, length = 256)
    private String password; // Hasz hasła

    @Column(name = "PhoneNumber", nullable = false, length = 9)
    @Pattern(regexp = "^[0-9]{9}$", message = "Phone number must be exactly 9 digits.")
    private String phoneNumber; // Numer telefonu

    @Column(name = "BirthDate", nullable = false)
    @Pattern(regexp = "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])$", message = "BirthDate must be in the format DD-MM and within valid ranges.")
    private String birthDate;

    @Column(name = "Role", nullable = false)
    @Enumerated(EnumType.STRING) // Przechowywanie roli jako stringa
    private Role role; // Rola użytkownika
}
