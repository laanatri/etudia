package com.etudia.etudia.controller;

import com.etudia.etudia.dto.AuthResponse;
import com.etudia.etudia.dto.AuthRequest;
import com.etudia.etudia.model.User;
import com.etudia.etudia.service.JwtService;
import com.etudia.etudia.service.UserInfosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserAuthController {

    private final UserInfosService userInfosService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/generateToken")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getUsername());
                User user = userInfosService.getUserByUsername(authRequest.getUsername());
                AuthResponse authResponse = new AuthResponse(
                        token,
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getRole()
                );
                return ResponseEntity.ok(authResponse);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Authentication."));

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Pseudo ou mot de passe invalide."));
        } catch (Exception e) {
            System.err.println("An unexpected error occurred during authentication: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Erreur serveur."));
        }
    }

}