package com.example.studiomanagerapp_backend.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String birthDate;
    private String role;
    private String token;
}