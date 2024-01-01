package cacttus.education.eventapi.services;

import cacttus.education.eventapi.dto.EventDto;


import java.util.List;

public interface EventService {

    void createEvent(EventDto eventDto);

    void updateEvent(long id, EventDto updateEventDto);

    void deleteEventById(long id);

    EventDto getEventById(long id);

    List<EventDto> getAllEvent();


}
