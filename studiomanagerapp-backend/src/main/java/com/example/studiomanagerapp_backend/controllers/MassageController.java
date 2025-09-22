package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.dtos.massage.MassageDto;
import com.example.studiomanagerapp_backend.services.MassageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/massages")
@RequiredArgsConstructor
public class MassageController {
    private final MassageService massageService;

    @GetMapping
    public List<MassageDto> getAllMassages() {
        return massageService.getAllMassages();
    }

    @PostMapping
    public ResponseEntity<MassageDto> addMassage(@RequestBody MassageDto massageDto) {
        MassageDto createdMassage = massageService.addMassage(massageDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMassage);
    }
}