package cacttus.education.eventapi.mappers;

import cacttus.education.eventapi.dto.EventDto;
import cacttus.education.eventapi.enums.EventStatus;
import cacttus.education.eventapi.enums.EventType;
import cacttus.education.eventapi.models.Event;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class EventMapper {
    public Event toEntity(EventDto dto) {
        Event event = new Event();
        event.setId(dto.getId());
        event.setEventName(dto.getEventName());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setRegistrationFee(dto.getRegistrationFee());
        event.setContactEmail(dto.getContactEmail());
        event.setContactPhone(dto.getContactPhone());
        event.setEventType(EventType.valueOf(dto.getEventType()));
        event.setEventStatus(EventStatus.valueOf(dto.getEventStatus()));
        event.setVenue(dto.getVenue());
        event.setAddress(dto.getAddress());
        event.setOrganizer(dto.getOrganizer());
        event.setCreatedDate(LocalDateTime.now());
        event.setLastUpdatedDate(LocalDateTime.now());

        return event;
    }

    public EventDto toDto(Event event) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setEventName(event.getEventName());
        dto.setDescription(event.getDescription());
        dto.setEventDate(event.getEventDate());
        dto.setRegistrationFee(event.getRegistrationFee());
        dto.setContactEmail(event.getContactEmail());
        dto.setContactPhone(event.getContactPhone());
        dto.setEventType(event.getEventType().name());
        dto.setEventStatus(event.getEventStatus().name());
        dto.setOrganizer(event.getOrganizer());
        dto.setVenue(event.getVenue());
        dto.setAddress(event.getAddress());
        return dto;
    }
}
