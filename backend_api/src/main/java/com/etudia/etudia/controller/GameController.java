package com.etudia.etudia.controller;

import com.etudia.etudia.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game")
@AllArgsConstructor
public class GameController {

    private GameService gameService;

    @PostMapping("/create")
    public Integer createGame(Integer score, Integer quizId) {
        return gameService.createGame(score, quizId);
    }

}