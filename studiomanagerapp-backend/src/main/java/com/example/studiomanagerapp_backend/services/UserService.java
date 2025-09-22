package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.user.CredentialsDto;
import com.example.studiomanagerapp_backend.dtos.user.SignUpDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.exception.AppException;
import com.example.studiomanagerapp_backend.mappers.UserMapper;
import com.example.studiomanagerapp_backend.models.User;
import com.example.studiomanagerapp_backend.models.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.studiomanagerapp_backend.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Użytkownik nie znaleziony", HttpStatus.NOT_FOUND));
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new AppException("Użytkownik nie znaleziony", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Nieprawidłowe hasło", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalEmail = userRepository.findByEmail(userDto.getEmail());

        if (optionalEmail.isPresent()) {
            throw new AppException("Email już istnieje", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);

        // Sprawdzenie, czy w bazie danych istnieją jacyś użytkownicy
        boolean isFirstUser = userRepository.count() == 0;
        user.setRole(isFirstUser ? Role.ADMIN : Role.USER); // Użycie wartości enuma Role

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    public void updateUserRole(Integer id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("Nie znaleziono użytkownika o ID: " + id, HttpStatus.NOT_FOUND));
        try {
            Role role = Role.valueOf(newRole.toUpperCase()); // Konwersja String na enum Role
            user.setRole(role);
            userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new AppException("Podano nieprawidłową rolę: " + newRole, HttpStatus.BAD_REQUEST);
        }
    }
}