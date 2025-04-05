package Jupiter_Unified_Dashboard_api.controller;

import Jupiter_Unified_Dashboard_api.model.Role;
import Jupiter_Unified_Dashboard_api.repo.Rolerepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class Rolecontroller {

    @Autowired
    private Rolerepo roleRepository;

    // Create or update a role
    @PostMapping
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role savedRole = roleRepository.save(role);
        return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
    }

    // Get all roles
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    // Get a role by ID
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        Optional<Role> role = roleRepository.findById(id);
        return role.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a role by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}