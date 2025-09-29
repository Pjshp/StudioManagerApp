package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.models.Room;
import com.example.studiomanagerapp_backend.repositories.RoomRepository;
import com.example.studiomanagerapp_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Integer id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Integer id) {
        roomRepository.deleteById(id);
    }
}
