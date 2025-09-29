package com.example.studiomanagerapp_backend.services;

import com.example.studiomanagerapp_backend.dtos.event.EventDto;
import com.example.studiomanagerapp_backend.mappers.EventMapper;
import com.example.studiomanagerapp_backend.models.Event;
import com.example.studiomanagerapp_backend.repositories.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventService(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    public EventDto createEvent(EventDto eventDto) {
        Event event = eventMapper.toEvent(eventDto);
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toEventDto(savedEvent);
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(eventMapper::toEventDto)
                .collect(Collectors.toList());
    }

    public EventDto updateEvent(Integer id, EventDto eventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Event updatedEvent = eventMapper.updateEventFromDto(eventDto, event);
        Event savedEvent = eventRepository.save(updatedEvent);
        return eventMapper.toEventDto(savedEvent);
    }

    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }
}
