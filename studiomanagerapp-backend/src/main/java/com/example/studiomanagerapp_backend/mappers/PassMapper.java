package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.pass.PassDto;
import com.example.studiomanagerapp_backend.models.Pass;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface PassMapper {

    @Mapping(target = "passType", expression = "java(pass.getPassType().name())")
    @Mapping(target = "purchaseDate", expression = "java(pass.getPurchaseDate().toString())")
    @Mapping(target = "expiryDate", expression = "java(pass.getExpiryDate().toString())")
    PassDto toPassDto(Pass pass);

    @Mapping(target = "passType", expression = "java(com.example.studiomanagerapp_backend.models.PassType.valueOf(passDto.getPassType()))")
    @Mapping(target = "purchaseDate", expression = "java(java.time.LocalDate.parse(passDto.getPurchaseDate()))")
    @Mapping(target = "expiryDate", expression = "java(java.time.LocalDate.parse(passDto.getExpiryDate()))")
    Pass toPass(PassDto passDto);
}
