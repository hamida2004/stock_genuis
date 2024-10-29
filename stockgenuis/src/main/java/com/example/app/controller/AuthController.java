package com.example.app.controller;

import com.example.app.model.User;
import com.example.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = authService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (AuthService.UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        System.out.println("Login attempt: " + user.getEmail());
        Optional<User> loggedInUser = authService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser.isPresent()) {
            System.out.println("Login successful for: " + user.getEmail());
            return new ResponseEntity<>(loggedInUser.get(), HttpStatus.OK);
        } else {
            System.out.println("Login failed for: " + user.getEmail());
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

    }
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody String email) {
        authService.generateResetCode(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<Boolean> verifyResetCode(@RequestBody User user) {
        boolean isValid = authService.verifyResetCode(user.getEmail(), user.getResetCode());
        if (isValid) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody User user) {
        authService.resetPassword(user.getEmail(), user.getPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
