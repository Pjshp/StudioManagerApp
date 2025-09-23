package com.example.studiomanagerapp_backend.repositories;

import com.example.studiomanagerapp_backend.models.Review;
import com.example.studiomanagerapp_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
