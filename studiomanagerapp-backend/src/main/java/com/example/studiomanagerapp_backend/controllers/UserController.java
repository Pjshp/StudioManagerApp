package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Integer id, @RequestBody String newRole) {
        try {
            userService.updateUserRole(id, newRole);
            return ResponseEntity.ok("Rola użytkownika została pomyślnie zaktualizowana.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Nieprawidłowa rola: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nie udało się zaktualizować roli użytkownika: " + e.getMessage());
        }
    }
}