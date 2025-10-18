package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Answer;
import com.etudia.etudia.model.Question;

import java.util.List;

public interface AnswerService {

    List<Answer> getAnswersByQuestionId(Integer questionId);

    boolean saveAnswers(CapsulesGenerateResponse.QuizQuestionDto quizQuestion, Question question);

}