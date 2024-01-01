package cacttus.education.eventapi.repositories;

import cacttus.education.eventapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByEmail(String email);
     Optional<User> findByUsername(String username);
     Optional<User> findByUsernameAndPassword(String username, String password);
}
