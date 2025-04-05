package Jupiter_Unified_Dashboard_api.repo;

import Jupiter_Unified_Dashboard_api.model.Role;
import Jupiter_Unified_Dashboard_api.repo.Rolerepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Rolerepo extends JpaRepository<Role, Long> {
    // Custom query methods can be added here if needed
}