package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> getNotesByUserId(Integer userId);

    @Query("SELECT n FROM Note n WHERE n.user.id = :userId AND (LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.content) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> getNotesByUserIdAndQuery(@Param("userId") Integer userId, @Param("query") String query);
}
