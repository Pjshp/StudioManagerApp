package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.room.RoomDto;
import com.example.studiomanagerapp_backend.models.Room;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomDto toRoomDto(Room room);

    Room toRoom(RoomDto roomDto);

    List<RoomDto> toRoomDtoList(List<Room> rooms);

    List<Room> toRoomList(List<RoomDto> dtos);

    Room updateRoomFromDto(RoomDto dto, @MappingTarget Room room);
}
