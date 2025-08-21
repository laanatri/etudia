package com.etudia.etudia.controller;

import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.service.BlocService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bloc")
@AllArgsConstructor
public class BlocController {

    private BlocService blocService;

    @GetMapping("/read/{user_id}")
    public List<Bloc> getBlocs(@PathVariable Integer user_id) {
        return blocService.getBlocByUserId(user_id);
    }

}
