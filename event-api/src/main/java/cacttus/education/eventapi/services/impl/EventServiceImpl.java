package cacttus.education.eventapi.services.impl;

import cacttus.education.eventapi.dto.EventDto;
import cacttus.education.eventapi.enums.EventStatus;
import cacttus.education.eventapi.enums.EventType;
import cacttus.education.eventapi.exceptions.EventNotFoundException;
import cacttus.education.eventapi.mappers.EventMapper;
import cacttus.education.eventapi.models.Event;
import cacttus.education.eventapi.repositories.EventRepository;
import cacttus.education.eventapi.services.EventService;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;


@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }


    @Override
    public void createEvent(EventDto eventDto) {
        Event event = eventMapper.toEntity(eventDto);
        eventRepository.save(event);
    }

    @Override
    public void updateEvent(long id, EventDto updateEventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));


        event.setEventName(updateEventDto.getEventName());
        event.setDescription(updateEventDto.getDescription());
        event.setEventDate(updateEventDto.getEventDate());
        event.setRegistrationFee(updateEventDto.getRegistrationFee());
        event.setContactEmail(updateEventDto.getContactEmail());
        event.setContactPhone(updateEventDto.getContactPhone());
        event.setEventType(EventType.valueOf(updateEventDto.getEventType()));
        event.setEventStatus(EventStatus.valueOf(updateEventDto.getEventStatus()));
        event.setOrganizer(updateEventDto.getOrganizer());
        event.setVenue(updateEventDto.getVenue());
        event.setAddress(updateEventDto.getAddress());
        event.setLastUpdatedDate(LocalDateTime.now());

        eventRepository.save(event);
    }

    @Override
    public void deleteEventById(long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
        eventRepository.deleteById(id);
    }

    @Override
    public EventDto getEventById(long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
        EventDto eventDto = eventMapper.toDto(event);
        return eventDto;
    }

    @Override
    public List<EventDto> getAllEvent() {
        return eventRepository.findAll().stream().map(eventMapper::toDto).toList();
    }
}
