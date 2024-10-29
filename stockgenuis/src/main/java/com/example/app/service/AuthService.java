package com.example.app.service;

import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) throws UserAlreadyExistsException {
        Optional<User> found = userRepository.findByEmail(user.getEmail());
        if (found.isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println("smth: \n"+user);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();

    }

    public void generateResetCode(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String resetCode = String.format("%05d", (int) (Math.random() * 100000));
            user.get().setResetCode(resetCode);
            userRepository.save(user.get());
            emailService.sendEmail(user.get().getEmail(), "Password Reset Code", "Your reset code is: " + resetCode);
        }
    }
    public class UserAlreadyExistsException extends Exception {
        public UserAlreadyExistsException(String message) {
            super(message);
        }
    }
    public boolean verifyResetCode(String email, String resetCode) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getResetCode().equals(resetCode);
    }

    public void resetPassword(String email, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(newPassword));
            user.get().setResetCode(null);
            userRepository.save(user.get());
        }
    }
}
