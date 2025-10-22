package com.etudia.etudia.controller;

import com.etudia.etudia.dto.QuestionDto;
import com.etudia.etudia.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/question")
@AllArgsConstructor
public class QuestionController {

    private QuestionService questionService;

    @GetMapping("/quiz/{quiz_id}")
    public List<QuestionDto> findByQuiz_id(@PathVariable Integer quiz_id) {
        return questionService.getQuestionsByQuizId(quiz_id);
    }

}