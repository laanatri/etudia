package com.etudia.etudia.service;

import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setId(null);
        return userRepository.save(user);
    }

    @Override
    public List<User> readUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> updateUser(Integer id, User user) {
        return Optional.ofNullable(userRepository.findById(id)
        .map(u -> {
            if (user.getUsername() != null && !user.getUsername().isEmpty() ) {
                u.setUsername(user.getUsername());
            }
            if (user.getFirstname() != null && !user.getFirstname().isEmpty() ) {
                u.setFirstname(user.getFirstname());
            }
            if (user.getLastname() != null && !user.getLastname().isEmpty() ) {
                u.setLastname(user.getLastname());
            }
            if (user.getEmail() != null && !user.getEmail().isEmpty() ) {
                u.setEmail(user.getEmail());
            }
            if (user.getPassword() != null && !user.getPassword().isEmpty() ) {
                u.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return  userRepository.save(u);
        }).orElseThrow(() -> new RuntimeException("utilisateur non trouvé")));
    }

    @Override
    public String deleteUser(Integer id) {
        userRepository.deleteById(id);
        return "Utilisateur supprimé !";
    }

}