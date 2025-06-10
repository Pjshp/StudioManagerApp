package com.example.studiomanagerapp_backend.dtos.note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NoteDto {
    private Integer id;
    private String title;
    private String content;
    private Integer mood;
    private LocalDateTime noteDate;
    private boolean pinned;
}
