package com.etudia.etudia.controller;

import com.etudia.etudia.dto.BlocDto;
import com.etudia.etudia.service.BlocService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bloc")
@AllArgsConstructor
public class BlocController {

    private BlocService blocService;

    @GetMapping("/user/{user_id}")
    public List<BlocDto> getBlocs(@PathVariable Integer user_id, @RequestParam(defaultValue = "false") boolean favorite) {
        return blocService.getBlocByUserId(user_id, favorite);
    }

    @PatchMapping("/favorite/{bloc_id}")
    public void toggleFavorite(@PathVariable Integer bloc_id) {
        blocService.toggleFavorite(bloc_id);
    }

}