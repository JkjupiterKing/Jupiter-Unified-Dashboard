package Jupiter_Unified_Dashboard_api.repo;

import Jupiter_Unified_Dashboard_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface Userrepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // Find user by email (used for login)

    Optional<User> findByUsername(String username); // Find user by username
}
