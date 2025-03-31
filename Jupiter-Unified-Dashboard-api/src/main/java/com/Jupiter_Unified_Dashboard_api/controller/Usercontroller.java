package com.Jupiter_Unified_Dashboard_api.controller;

import com.Jupiter_Unified_Dashboard_api.model.User;
import com.Jupiter_Unified_Dashboard_api.repo.Userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class Usercontroller {

    @Autowired
    private Userrepo userRepository;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if email already exists
        Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserByEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        // Encode the password to Base64 before saving
        user.setPassword(encodePassword(user.getPassword()));

        // Save the new user to the database
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login (Just checking the password for simplicity)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        Optional<User> existingUser = userRepository.findByEmail(loginRequest.getEmail());

        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = existingUser.get();
        if (!checkPassword(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password.");
        }

        return ResponseEntity.ok("Login successful.");
    }

    // Get user details by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user.get());
    }

    // Get user details by email (for login purposes)
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user.get());
    }

    // Helper method to encode the password to Base64
    private String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    // Helper method to decode and compare the password
    private boolean checkPassword(String rawPassword, String encodedPassword) {
        // Decode the Base64 encoded password
        String decodedPassword = new String(Base64.getDecoder().decode(encodedPassword));

        // Compare the raw password (from the login request) with the decoded password
        return rawPassword.equals(decodedPassword);
    }
}
