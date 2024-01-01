package cacttus.education.eventapi.controllers;

import cacttus.education.eventapi.enums.EventStatus;
import cacttus.education.eventapi.enums.EventType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EnumController {

    @GetMapping("/event-status")
    public List<EventStatus> getAllEventStatus() {
        return List.of(EventStatus.values());
    }

    @GetMapping("/event-type")
    public List<EventType> getAllEventTypes() {
        return List.of(EventType.values());
    }
}
