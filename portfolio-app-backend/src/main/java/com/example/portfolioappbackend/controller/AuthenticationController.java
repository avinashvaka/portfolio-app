package com.example.portfolioappbackend.controller;

import com.example.portfolioappbackend.model.Users;
import com.example.portfolioappbackend.security.JwtTokenUtil;
import com.example.portfolioappbackend.model.AuthenticationRequest;
import com.example.portfolioappbackend.model.AuthenticationResponse;
import com.example.portfolioappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        logger.info("Login attempt for username: {}", authenticationRequest.getUsername());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );

            final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtTokenUtil.generateToken(userDetails);

            logger.info("Login successful for username: {}", authenticationRequest.getUsername());
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            logger.error("Login failed for username: {}", authenticationRequest.getUsername(), e);
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthenticationRequest authenticationRequest) {
        logger.info("Register user initiated: {}", authenticationRequest.getUsername());

        try {
            final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
            if (userDetails == null) {
                Users user = new Users();
                user.setUsername(authenticationRequest.getUsername());
                user.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
                userService.saveUser(user);

                logger.info("Registration successful for username: {}", authenticationRequest.getUsername());
                return ResponseEntity.status(202).body(Map.of("message", "Registration successful, please login."));

            } else {
                logger.error("Failed to Register: {}", authenticationRequest.getUsername());
                return ResponseEntity.status(400).body("Username already exists please login");
            }
        } catch (Exception e) {
            logger.error("Failed to Register: {}", authenticationRequest.getUsername(), e);
            return ResponseEntity.status(400).body("Failed to register user");
        }
    }
}
