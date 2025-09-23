package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.user.SignUpDto;
import com.example.studiomanagerapp_backend.dtos.user.UserDto;
import com.example.studiomanagerapp_backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.MonthDay;

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
    @Mapping(target = "birthDate", source = "birthDate")
    @Mapping(target = "role", source = "role")
    User toUser(UserDto userDto);

    default MonthDay map(String value) {
        if (value != null && value.matches("\\d{2}-\\d{2}")) {
            String[] parts = value.split("-");
            return MonthDay.of(Integer.parseInt(parts[1]), Integer.parseInt(parts[0]));
        }
        return null;
    }

    default String map(MonthDay value) {
        return value != null ? String.format("%02d-%02d", value.getDayOfMonth(), value.getMonthValue()) : null;
    }
}