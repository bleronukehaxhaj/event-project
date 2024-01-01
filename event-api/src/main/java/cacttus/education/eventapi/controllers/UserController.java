package cacttus.education.eventapi.controllers;

import cacttus.education.eventapi.dto.UserDto;
import cacttus.education.eventapi.exceptions.LoginException;
import cacttus.education.eventapi.exceptions.LogoutException;
import cacttus.education.eventapi.exceptions.RegistrationException;
import cacttus.education.eventapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.registerUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (RegistrationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {
        try {
            userService.login(userDto);
            return ResponseEntity.status(HttpStatus.OK).body("User logged in successfully!");
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody UserDto userDto) {
        try {
            userService.logout(userDto.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body("User logged out successfully!");
        } catch (LogoutException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
