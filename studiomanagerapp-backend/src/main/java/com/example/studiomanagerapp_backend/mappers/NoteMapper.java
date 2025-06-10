package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.note.NoteDto;
import com.example.studiomanagerapp_backend.models.Note;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    // Mapowanie Note -> NoteDto
    NoteDto toNoteDto(Note note);

    // Mapowanie NoteDto -> Note
    Note toNote(NoteDto noteDto);
}
