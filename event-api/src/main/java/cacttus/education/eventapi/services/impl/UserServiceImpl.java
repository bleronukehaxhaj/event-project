package cacttus.education.eventapi.services.impl;

import cacttus.education.eventapi.dto.UserDto;
import cacttus.education.eventapi.exceptions.LoginException;
import cacttus.education.eventapi.exceptions.LogoutException;
import cacttus.education.eventapi.exceptions.RegistrationException;
import cacttus.education.eventapi.mappers.UserMapper;
import cacttus.education.eventapi.models.User;
import cacttus.education.eventapi.repositories.UserRepository;
import cacttus.education.eventapi.services.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public void registerUser(UserDto userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RegistrationException("Email already taken");
        }

        User user = userMapper.toEntity(userDto);
        user.setLoggedIn(true);
        userRepository.save(user);
    }

    @Override
    public void login(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findByUsernameAndPassword(
                userDto.getUsername(), userDto.getPassword());

        if (optionalUser.isEmpty()) {
            throw new LoginException("Invalid credentials");
        }

        User user = optionalUser.get();
        user.setLoggedIn(true);
        userRepository.save(user);
    }

    @Override
    public void logout(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setLoggedIn(false);
            userRepository.save(user);
        } else {
            throw new LogoutException("User not found");
        }
    }
}
