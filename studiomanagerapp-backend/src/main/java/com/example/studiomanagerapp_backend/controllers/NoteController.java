package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.dtos.note.NoteDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.mappers.NoteMapper;
import com.example.studiomanagerapp_backend.mappers.UserMapper;
import com.example.studiomanagerapp_backend.models.Note;
import com.example.studiomanagerapp_backend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;
    private final NoteMapper noteMapper;
    private final UserMapper userMapper;

    @Autowired
    public NoteController(NoteService noteServices, NoteMapper noteMapper, UserMapper userMapper) {
        this.noteService = noteServices;
        this.noteMapper = noteMapper;
        this.userMapper = userMapper;
    }

    @GetMapping("/user")
    public ResponseEntity<List<NoteDto>> getNotesByUser(Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal(); // Pobierz zalogowanego użytkownika
        List<Note> notes = noteService.getNotesByUserId(userDto.getId());
        List<NoteDto> noteDtos = notes.stream()
                .map(noteMapper::toNoteDto)
                .toList();

        return ResponseEntity.ok(noteDtos);
    }

    @GetMapping("/user/search")
    public ResponseEntity<List<NoteDto>> getNotesByUserAndSearch(Authentication authentication, @RequestParam String query) {
        UserDto userDto = (UserDto) authentication.getPrincipal();
        List<Note> notes = noteService.getNotesByUserIdAndQuery(userDto.getId(), query);
        List<NoteDto> noteDto = notes.stream()
                .map(noteMapper::toNoteDto)
                .toList();

        return ResponseEntity.ok(noteDto);
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody NoteDto noteDto, Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();

        Note note = noteMapper.toNote(noteDto);
        note.setUser(userMapper.toUser(userDto));

        return ResponseEntity.ok(noteService.createNote(note));
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Integer noteId) {
        noteService.deleteNoteById(noteId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<Note> updateNoteById(@PathVariable Integer noteId, @RequestBody NoteDto noteDto) {
        Note note = noteMapper.toNote(noteDto);
        note.setId(noteId);
        return ResponseEntity.ok(noteService.updateNoteById(note));
    }

    @PutMapping("/{noteId}/pin")
    public ResponseEntity<Note> pinNoteById(@PathVariable Integer noteId,  @RequestParam boolean pinned) {
        Note note = noteService.findNoteById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.setPinned(pinned);

        return ResponseEntity.ok(noteService.updateNoteById(note));
    }
}
