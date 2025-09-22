package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.massage.MassageDto;
import com.example.studiomanagerapp_backend.models.Massage;
import com.example.studiomanagerapp_backend.repositories.MassageRepository;
import com.example.studiomanagerapp_backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MassageService {
    private final MassageRepository massageRepository;
    private final UserRepository userRepository; // To fetch the worker

    public List<MassageDto> getAllMassages() {
        return massageRepository.findAll()
                .stream()
                .map(massage -> new MassageDto(
                        massage.getId(),
                        massage.getPrice(),
                        massage.getDuration(),
                        massage.getType(),
                        massage.getWorker().getFirstName() + " " + massage.getWorker().getLastName(),
                        massage.getWorker().getId() // Add workerId here
                ))
                .toList();
    }

    public MassageDto addMassage(MassageDto massageDto) {
        Massage massage = new Massage();
        massage.setPrice(massageDto.getPrice());
        massage.setDuration(massageDto.getDuration());
        massage.setType(massageDto.getType());
        massage.setWorker(userRepository.findById(massageDto.getWorkerId())
                .orElseThrow(() -> new IllegalArgumentException("Worker not found")));
        massageRepository.save(massage);
        return new MassageDto(
                massage.getId(),
                massage.getPrice(),
                massage.getDuration(),
                massage.getType(),
                massage.getWorker().getFirstName() + " " + massage.getWorker().getLastName(),
                massage.getWorker().getId() // Add workerId here
        );
    }

    public void deleteMassageById(Long id) {
        if (!massageRepository.existsById(id)) {
            throw new EntityNotFoundException("Massage not found with id: " + id);
        }
        massageRepository.deleteById(id);
    }
}