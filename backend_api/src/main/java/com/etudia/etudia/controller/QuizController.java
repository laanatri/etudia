package com.etudia.etudia.controller;

import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@AllArgsConstructor
public class QuizController {

    private QuizService quizService;

    @GetMapping("/read/{user_id}")
    public List<Quiz> getQuizzes(@PathVariable Integer user_id, @RequestParam(required = false) boolean favorite) {
        if (favorite) {
            return quizService.getFavoriteQuizzesByUserId(user_id);
        }
        return quizService.getQuizByUserId(user_id);
    }

}