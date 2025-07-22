package com.etudia.etudia.dto;

import com.etudia.etudia.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String jwtToken;
    private Integer id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private Role role;

}
