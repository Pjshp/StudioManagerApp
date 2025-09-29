package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.dtos.pass.PassDto;
import com.example.studiomanagerapp_backend.services.PassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passes")
public class PassController {

    private final PassService passService;

    public PassController(PassService passService) {
        this.passService = passService;
    }

    @PostMapping
    public ResponseEntity<PassDto> addPass(@RequestBody PassDto passDto) {
        PassDto savedPass = passService.createPass(passDto);
        return ResponseEntity.ok(savedPass);
    }

    @GetMapping
    public List<PassDto> getAllPasses(@RequestParam(value = "userId", required = false) Integer userId) {
        if (userId != null) {
            return passService.getPassesByUser(userId);
        }
        return passService.getAllPasses();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PassDto> updatePass(
            @PathVariable Integer id,
            @RequestBody PassDto passDto) {
        PassDto updatedPass = passService.updatePass(id, passDto);
        return ResponseEntity.ok(updatedPass);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePass(@PathVariable Integer id) {
        passService.deletePass(id);
        return ResponseEntity.noContent().build();
    }
}
