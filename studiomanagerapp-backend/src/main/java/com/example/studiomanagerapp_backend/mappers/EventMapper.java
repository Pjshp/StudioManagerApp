package com.example.studiomanagerapp_backend.mappers;

import com.example.studiomanagerapp_backend.dtos.event.EventDto;
import com.example.studiomanagerapp_backend.models.Event;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = { ActivityMapper.class, RoomMapper.class })
public interface EventMapper {

    EventDto toEventDto(Event event);

    Event toEvent(EventDto eventDto);

    // do aktualizacji istniejącego obiektu
    Event updateEventFromDto(EventDto dto, @MappingTarget Event event);
}
