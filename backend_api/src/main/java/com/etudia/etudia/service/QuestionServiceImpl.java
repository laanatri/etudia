package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Question;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerService answerService;

    @Override
    public List<Question> getQuestionsByQuizId(Integer quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    @Override
    @Transactional
    public boolean saveQuestions(List<CapsulesGenerateResponse.QuizQuestionDto> quizQuestions, Quiz quiz) {

        if (quizQuestions == null || quizQuestions.isEmpty() || quiz == null) {
            log.warn("pas de questions à sauvegarder ou quiz est null");
            return false;
        }

        for (CapsulesGenerateResponse.QuizQuestionDto quizQuestion : quizQuestions) {
            Question question = new Question();
            question.setText(quizQuestion.getQuestion());
            question.setQuiz(quiz);

            Question savedQuestion = questionRepository.save(question);

            boolean answerSuccess = answerService.saveAnswers(quizQuestion, savedQuestion);

            if (!answerSuccess) {
                log.warn("échec de la sauvegarde des réponses pour la question: {}", quizQuestion.getQuestion());
                throw new RuntimeException("Erreur lors de la sauvegarde des réponses");
            }
        }

        log.info("questions bien sauvegardées");
        return true;

    }

}