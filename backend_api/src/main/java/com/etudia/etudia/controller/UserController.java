package com.etudia.etudia.controller;

import com.etudia.etudia.model.User;
import com.etudia.etudia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public User create(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/read")
    public List<User> read(){
        return userService.readUsers();
    }

    @PatchMapping("/update/{id}")
    public User update(@PathVariable Integer id, @RequestBody User user){
        return userService.updateUser(id, user)
                .map(updatedUser -> ResponseEntity.ok().body(updatedUser))
                .orElse(ResponseEntity.notFound().build()).getBody();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
        return userService.deleteUser(id);
    }

}