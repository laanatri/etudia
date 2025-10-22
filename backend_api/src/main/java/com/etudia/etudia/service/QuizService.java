package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.QuizDto;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;

import java.util.List;

public interface QuizService {

    List<QuizDto> getQuizByUserId(Integer userId, Boolean favorite);

    Boolean saveQuiz(User user, Course course, CapsulesGenerateResponse aiResponse);

}