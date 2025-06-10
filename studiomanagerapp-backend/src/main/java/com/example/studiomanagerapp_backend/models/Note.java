package com.example.studiomanagerapp_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Notes") // Ustawienie nazwy tabeli w bazie danych
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id") // Odpowiada kolumnie Id w bazie
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false) // Klucz obcy do tabeli Users
    private User user;

    @Column(name = "NoteDate", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime noteDate; // Data utworzenia notatki

    @Column(name = "Content", nullable = false, columnDefinition = "TEXT")
    private String content; // Treść notatki

    @Column(name = "Title", nullable = false)
    private String title; // Tytuł notatki

    @Column(name = "Mood")
    private Integer mood; // Ocena nastroju (1–10)

    @Column(name = "Pinned", nullable = false)
    private boolean pinned; // Czy notatka jest przypięta

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos; // Relacja z tabelą Photos
}
