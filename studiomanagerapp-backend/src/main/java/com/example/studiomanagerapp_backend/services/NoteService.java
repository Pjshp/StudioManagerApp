package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.mappers.UserMapper;
import com.example.studiomanagerapp_backend.models.Note;
import com.example.studiomanagerapp_backend.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserMapper userMapper;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserMapper userMapper) {
        this.noteRepository = noteRepository;
        this.userMapper = userMapper;
    }

    public List<Note> getNotesByUserId(Integer userId) {return noteRepository.getNotesByUserId(userId);}

    public Note createNote(Note note) {return noteRepository.save(note);}

    public void deleteNoteById(Integer noteId) {
        noteRepository.deleteById(noteId);
    }

    public Optional<Note> findNoteById(Integer noteId) {
        return noteRepository.findById(noteId);
    }

    public Note updateNoteById(Note note) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();
        note.setUser(userMapper.toUser(userDto));

        return noteRepository.save(note);
    }

    public List<Note> getNotesByUserIdAndQuery(Integer userId, String query) {
        return noteRepository.getNotesByUserIdAndQuery(userId, query);
    }
}
