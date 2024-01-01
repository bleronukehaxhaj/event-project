package cacttus.education.eventapi.services;

import cacttus.education.eventapi.dto.UserDto;

public interface UserService {
    void registerUser(UserDto userDto);

    void login(UserDto userDto);

    void logout(String email);

}
