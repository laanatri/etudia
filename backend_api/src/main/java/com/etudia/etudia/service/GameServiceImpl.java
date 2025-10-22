package com.etudia.etudia.service;

import com.etudia.etudia.model.Game;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.repository.GameRepository;
import com.etudia.etudia.repository.QuizRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final QuizRepository quizRepository;

    @Override
    public Integer createGame(Integer score, Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz non trouvé id: " + quizId));
        Game game = new Game();
        game.setScore(score);
        game.setQuiz(quiz);
        game = gameRepository.save(game);
        return game.getScore();
    };

}