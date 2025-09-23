package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.repositories.RoomRepository;
import com.example.studiomanagerapp_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
}
