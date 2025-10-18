package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.model.User;

import java.util.List;

public interface QuizService {

    List<Quiz> getQuizByUserId(Integer user_id);

    List<Quiz> getFavoriteQuizzesByUserId(Integer user_id);

    Boolean saveQuiz(User user, Course course, CapsulesGenerateResponse aiResponse);

}