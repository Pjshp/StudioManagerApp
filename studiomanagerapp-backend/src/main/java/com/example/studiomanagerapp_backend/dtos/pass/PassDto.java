package com.example.studiomanagerapp_backend.dtos.pass;

import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PassDto {
    private Integer id;
    private String passType;
    private UserDto user;
    private String purchaseDate;
    private String expiryDate;
    private Integer classesLeft;
}
