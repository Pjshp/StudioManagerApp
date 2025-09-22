package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.config.UserAuthProvider;
import com.example.studiomanagerapp_backend.dtos.user.CredentialsDto;
import com.example.studiomanagerapp_backend.dtos.user.SignUpDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto user = userService.login(credentialsDto);

        // Use email instead of username
        user.setToken(userAuthProvider.createToken(user.getEmail()));

        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
        UserDto user = userService.register(signUpDto);

        // Use email instead of username
        user.setToken(userAuthProvider.createToken(user.getEmail()));

        return ResponseEntity.created(URI.create("/users/" + user.getId()))
                .body(user);
    }
}