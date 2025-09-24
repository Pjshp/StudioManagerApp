package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.pass.PassDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.models.Pass;
import com.example.studiomanagerapp_backend.models.PassType;
import com.example.studiomanagerapp_backend.models.User;
import com.example.studiomanagerapp_backend.repositories.PassRepository;
import com.example.studiomanagerapp_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PassService {

    @Autowired
    private PassRepository passRepository;
    private final UserRepository userRepository;

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
