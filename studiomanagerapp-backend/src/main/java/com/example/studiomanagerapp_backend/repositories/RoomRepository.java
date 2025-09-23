package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Room;
import com.example.studiomanagerapp_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}
