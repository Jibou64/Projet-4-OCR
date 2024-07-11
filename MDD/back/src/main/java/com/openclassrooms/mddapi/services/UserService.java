package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.payload.request.UpdateUserRequest;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User updateUser(Long userId, UpdateUserRequest updateUserRequest) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(updateUserRequest.getFirstName());
            user.setLastName(updateUserRequest.getLastName());
            user.setEmail(updateUserRequest.getEmail());


            if (updateUserRequest.getPassword() != null && !updateUserRequest.getPassword().isEmpty()) {
                String hashedPassword = passwordEncoder.encode(updateUserRequest.getPassword());
                user.setPassword(hashedPassword);
                System.out.println("Password hashed successfully");
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null); // or handle differently based on your application's logic
    }

    public List<Subscription> getSubscriptionsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getSubscriptions();
        } else {
            return Collections.emptyList();
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
