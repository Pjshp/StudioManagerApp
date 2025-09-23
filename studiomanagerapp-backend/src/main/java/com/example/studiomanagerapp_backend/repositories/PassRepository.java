package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Pass;
import com.example.studiomanagerapp_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassRepository extends JpaRepository<Pass, Integer> {
}
