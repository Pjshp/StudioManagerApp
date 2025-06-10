package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.user.SignUpDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true) // Id generowane automatycznie
    @Mapping(target = "role", source = "role") // Mapowanie roli
    User signUpToUser(SignUpDto userDto);

    @Mapping(target = "role", source = "role") // Mapowanie roli
    UserDto toUserDto(User user);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "role", source = "role")
    User toUser(UserDto userDto);
}