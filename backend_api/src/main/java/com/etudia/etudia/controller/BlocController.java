package com.etudia.etudia.controller;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.service.BlocService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public Boolean createBloc(@RequestBody CapsulesCreateRequest capsulesCreateRequest) {
        return blocService.saveBloc(capsulesCreateRequest);
    }

}