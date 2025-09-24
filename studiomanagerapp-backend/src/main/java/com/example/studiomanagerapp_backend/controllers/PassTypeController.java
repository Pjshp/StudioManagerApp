package com.example.studiomanagerapp_backend.controllers;

import com.example.studiomanagerapp_backend.models.PassType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.studiomanagerapp_backend.dtos.pass.PassTypeDto;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PassTypeController {

    @GetMapping("/passtypes")
    public List<PassTypeDto> getPassTypes() {
        return Arrays.stream(PassType.values())
                .map(type -> new PassTypeDto(
                        type.name(),
                        type.getNumberOfClasses(),
                        type.getPrice(),
                        type.getValidityInDays()
                ))
                .collect(Collectors.toList());
    }


}
