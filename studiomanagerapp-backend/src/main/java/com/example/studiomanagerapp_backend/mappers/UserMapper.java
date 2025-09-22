package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.user.SignUpDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true) // Id is generated automatically
    @Mapping(target = "role", ignore = true) // Role is managed by the admin
    User signUpToUser(SignUpDto userDto);

    @Mapping(target = "role", source = "role") // Map role for UserDto
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true) // Ignore password mapping
    @Mapping(target = "id", source = "id")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "role", source = "role")
    User toUser(UserDto userDto);
}