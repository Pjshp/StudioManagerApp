package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Photos") // Ustawienie nazwy tabeli w bazie danych
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "NoteId", nullable = false) // Klucz obcy do tabeli Notes
    private Note note;

    @Column(name = "ImageData", nullable = false)
    @Lob // Określenie, że dane są dużego rozmiaru (VARBINARY(MAX))
    private byte[] imageData; // Dane binarne zdjęcia
}