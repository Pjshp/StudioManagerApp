package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    List<Photo> findByNoteId(Integer noteId);
}
