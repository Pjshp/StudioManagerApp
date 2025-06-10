package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.models.Photo;
import com.example.studiomanagerapp_backend.repositories.PhotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<Photo> findByNoteId(Integer noteId) {
        return photoRepository.findByNoteId(noteId);
    }

    public Photo save(Photo photo) {
        return photoRepository.save(photo);
    }

    public void deleteById(Integer photoId) {
        photoRepository.deleteById(photoId);
    }
}
