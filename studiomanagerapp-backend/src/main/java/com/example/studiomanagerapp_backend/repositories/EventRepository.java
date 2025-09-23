package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Event;
import com.example.studiomanagerapp_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
}
