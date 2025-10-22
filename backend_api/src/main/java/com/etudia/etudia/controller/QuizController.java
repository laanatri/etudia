package com.etudia.etudia.controller;

import com.etudia.etudia.dto.QuizDto;
import com.etudia.etudia.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@AllArgsConstructor
public class QuizController {

    private QuizService quizService;

    @GetMapping("/user/{user_id}")
    public List<QuizDto> getQuizzes(@PathVariable Integer user_id, @RequestParam(defaultValue = "false") boolean favorite) {
        return quizService.getQuizByUserId(user_id, favorite);
    }

}