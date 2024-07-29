package com.example.portfolioappbackend.service;

import com.example.portfolioappbackend.model.Users;
import com.example.portfolioappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> userModel = userRepository.findByUsername(username);
        if (userModel.isPresent()) {
            Users userDetails = userModel.get();
            return new User(userDetails.getUsername(), userDetails.getPassword(), new ArrayList<>());
        } else {
            return null;
        }
    }

    public void saveUser(Users user) {
        userRepository.save(user);
    }

    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
