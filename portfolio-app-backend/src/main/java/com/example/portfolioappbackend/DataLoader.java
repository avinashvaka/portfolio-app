package com.example.portfolioappbackend;

import com.example.portfolioappbackend.model.Users;
import com.example.portfolioappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userService.findByUsername("user").isEmpty()) {
            Users user = new Users();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("password"));
            userService.saveUser(user);
        }
    }

}
