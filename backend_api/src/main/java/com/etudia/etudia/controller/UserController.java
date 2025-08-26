package com.etudia.etudia.controller;

import com.etudia.etudia.dto.AuthResponse;
import com.etudia.etudia.model.User;
import com.etudia.etudia.service.JwtService;
import com.etudia.etudia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/create")
    public User create(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/read")
    public List<User> read(){
        return userService.readUsers();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody User user){
        return userService.updateUser(id, user)
            .map(updatedUser -> {

                String updatedToken = jwtService.generateToken(updatedUser.getUsername());

                AuthResponse authResponse = new AuthResponse(
                    updatedToken,
                    updatedUser.getId(),
                    updatedUser.getUsername(),
                    updatedUser.getEmail(),
                    updatedUser.getFirstname(),
                    updatedUser.getLastname(),
                    updatedUser.getRole()
                );

                return ResponseEntity.ok().body(authResponse);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
        return userService.deleteUser(id);
    }

}