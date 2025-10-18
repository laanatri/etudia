package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.QuizRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionService questionService;

    @Override
    public List<Quiz> getQuizByUserId(Integer userId) {
        return quizRepository.findByCourseUserId(userId);
    };

    @Override
    public List<Quiz> getFavoriteQuizzesByUserId(Integer userId) {
        return quizRepository.findByCourseUserIdAndFavoriteTrue(userId);
    };

    @Override
    @Transactional
    public Boolean saveQuiz(User user, Course course, CapsulesGenerateResponse aiResponse) {

        Quiz newQuiz = Quiz.builder()
                .name(aiResponse.getTitle() != null ? aiResponse.getTitle() : "Quiz")
                .themes(aiResponse.getThemes() != null ? aiResponse.getThemes() : "")
                .course(course)
                .build();

        Quiz savedQuiz = quizRepository.save(newQuiz);

        boolean questionsSuccess = questionService.saveQuestions(aiResponse.getCapsules().getQuiz(), savedQuiz);

        if (!questionsSuccess) {
            log.error("La sauvegarde des questions a échoué.");
            throw new RuntimeException("Erreur lors de la sauvegarde des questions");
        }

        return true;

    };

}