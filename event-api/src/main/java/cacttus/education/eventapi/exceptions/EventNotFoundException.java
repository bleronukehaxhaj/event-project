package cacttus.education.eventapi.exceptions;

import jakarta.persistence.EntityNotFoundException;

public class EventNotFoundException extends EntityNotFoundException {

    public EventNotFoundException(String message) {
        super(message);
    }

}
