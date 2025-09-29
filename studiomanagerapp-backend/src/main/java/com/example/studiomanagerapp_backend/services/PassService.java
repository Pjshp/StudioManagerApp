package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.pass.PassDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.mappers.PassMapper;
import com.example.studiomanagerapp_backend.models.Pass;
import com.example.studiomanagerapp_backend.models.PassType;
import com.example.studiomanagerapp_backend.models.User;
import com.example.studiomanagerapp_backend.repositories.PassRepository;
import com.example.studiomanagerapp_backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PassService {

    @Autowired
    private PassRepository passRepository;
    private final UserRepository userRepository;
    private final PassMapper passMapper;

    public PassDto createPass(PassDto passDto) {
        if (passDto.getPassType() == null || passDto.getPassType().isEmpty()) {
            throw new IllegalArgumentException("PassType name cannot be null or empty");
        }

        // 🔹 pobierz użytkownika
        User user = userRepository.findById(passDto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Pass pass = new Pass();
        pass.setPassType(PassType.valueOf(passDto.getPassType()));
        pass.setPurchaseDate(LocalDate.parse(passDto.getPurchaseDate()));
        pass.setClassesLeft(passDto.getClassesLeft());
        pass.setExpiryDate(LocalDate.parse(passDto.getExpiryDate()));
        pass.setUser(user);

        passRepository.save(pass);

        return mapToDto(pass);
    }

    public List<PassDto> getAllPasses() {
        return passRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<PassDto> getPassesByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return passRepository.findByUser(user).stream()
                .map(this::mapToDto)
                .toList();
    }

    public PassDto updatePass(Integer id, PassDto passDto) {
        Pass existing = passRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pass not found"));

        // MapStruct -> konwersja z PassDto na Pass (nowe dane)
        Pass updated = passMapper.toPass(passDto);

        // Upewniamy się, że ID i User zostają poprawnie przypisane
        updated.setId(existing.getId());

        if (passDto.getUser() != null && passDto.getUser().getId() != null) {
            updated.setUser(
                    userRepository.findById(passDto.getUser().getId())
                            .orElseThrow(() -> new EntityNotFoundException("User not found"))
            );
        } else {
            updated.setUser(existing.getUser());
        }

        Pass saved = passRepository.save(updated);
        return passMapper.toPassDto(saved);
    }

    public void deletePass(Integer id) {
        if (!passRepository.existsById(id)) {
            throw new EntityNotFoundException("Pass not found");
        }
        passRepository.deleteById(id);
    }

    // 🔥 mapper — przekształca encję Pass na PassDto
    private PassDto mapToDto(Pass pass) {
        User u = pass.getUser();

        UserDto userDto = new UserDto(
                u.getId(),
                u.getEmail(),
                u.getFirstName(),
                u.getLastName(),
                u.getPhoneNumber(),
                u.getBirthDate() != null ? u.getBirthDate().toString() : null,
                u.getRole().toString(),
                null // tokena zwykle nie zwracamy
        );

        return new PassDto(
                pass.getId(),
                pass.getPassType().name(),
                userDto,
                pass.getPurchaseDate().toString(),
                pass.getExpiryDate().toString(),
                pass.getClassesLeft()
        );
    }
}
