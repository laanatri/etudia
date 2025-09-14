package com.etudia.etudia.service;

import com.etudia.etudia.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    List<User> readUsers();

    User readUser(Integer user_id);

    Optional<User> updateUser(Integer id, User user);

    String deleteUser(Integer id);

} 