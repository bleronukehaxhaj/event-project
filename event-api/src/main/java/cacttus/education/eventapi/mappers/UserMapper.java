package cacttus.education.eventapi.mappers;

import cacttus.education.eventapi.dto.UserDto;
import cacttus.education.eventapi.models.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
public class UserMapper {
    public User toEntity(UserDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setCreatedDate(LocalDateTime.now());
        return user;
    }

    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setPassword(null);
        return dto;
    }
}
