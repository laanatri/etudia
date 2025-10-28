package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.QuizDto;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.GameRepository;
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
    private final GameRepository gameRepository;

    @Override
    public List<QuizDto> getQuizByUserId(Integer userId, Boolean favorite) {
        List<Quiz> quizzes;
        if (favorite) {
            quizzes = quizRepository.findByCourseUserIdAndFavoriteTrue(userId);
        } else {
            quizzes = quizRepository.findByCourseUserId(userId);
        }
        return quizzes.stream().map(quiz -> {
            Integer bestScore = gameRepository.findBestScoreByQuizId(quiz.getId());
            if (bestScore == null) {
                bestScore = 0;
            }
            QuizDto dto = new QuizDto();
            dto.setId(quiz.getId());
            dto.setName(quiz.getName());
            dto.setThemes(quiz.getThemes());
            dto.setCreatedAt(quiz.getCreatedAt());
            dto.setIsFavorite(quiz.getIsFavorite());
            dto.setBestScore(bestScore);
            return dto;
        }).toList();
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

    @Override
    public void toggleFavorite(Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));

        quiz.setIsFavorite(!quiz.getIsFavorite());
        quizRepository.save(quiz);
    };

}