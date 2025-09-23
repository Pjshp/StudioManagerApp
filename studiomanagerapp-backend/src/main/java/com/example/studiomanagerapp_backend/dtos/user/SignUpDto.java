package com.example.studiomanagerapp_backend.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SignUpDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String birthDate;
}
