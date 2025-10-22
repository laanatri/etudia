package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.QuestionDto;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Question;
import com.etudia.etudia.model.Quiz;

import java.util.List;

public interface QuestionService {

    List<QuestionDto> getQuestionsByQuizId(Integer quizId);

    boolean saveQuestions(List<CapsulesGenerateResponse.QuizQuestionDto> questions, Quiz quiz);

}