package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.repositories.AvailabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AvailabilityService {

    @Autowired
    private AvailabilityRepository availabilityRepository;
}
