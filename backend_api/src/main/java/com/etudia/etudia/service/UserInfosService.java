package com.etudia.etudia.service;

import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.UserRepository;
import com.etudia.etudia.security.UserInfosDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfosService implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    public UserInfosService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail  = Optional.ofNullable(repository.findByUsername(username));
        return userDetail.map(UserInfosDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public User getUserByUsername(String username) {
        return repository.findByUsername(username);
    }

}