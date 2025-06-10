package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.models.Photo;
import com.example.studiomanagerapp_backend.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    private final PhotoService photoServices;

    @Autowired
    public PhotoController(PhotoService photoServices) {
        this.photoServices = photoServices;
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<List<Photo>> getPhotosByNoteId(@PathVariable Integer noteId) {
        return ResponseEntity.ok(photoServices.findByNoteId(noteId));
    }

    @PostMapping
    public ResponseEntity<Photo> addPhoto(@RequestBody Photo photo) {
        return ResponseEntity.ok(photoServices.save(photo));
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhotoById(@PathVariable Integer photoId) {
        photoServices.deleteById(photoId);
        return ResponseEntity.noContent().build();
    }
}
