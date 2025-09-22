package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Massage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MassageRepository extends JpaRepository<Massage, Long> {
}
