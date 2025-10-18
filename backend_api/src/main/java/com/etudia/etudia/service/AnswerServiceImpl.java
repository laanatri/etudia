package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Answer;
import com.etudia.etudia.model.Question;
import com.etudia.etudia.repository.AnswerRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class AnswerServiceImpl implements AnswerService {

    private AnswerRepository answerRepository;

    @Override
    public List<Answer> getAnswersByQuestionId(Integer questionId) {
        return answerRepository.findAllByQuestionId(questionId);
    }

    @Override
    public boolean saveAnswers(CapsulesGenerateResponse.QuizQuestionDto quizQuestion, Question question) {

        if (quizQuestion == null || quizQuestion.getAnswers() == null || quizQuestion.getAnswers().isEmpty()) {
            log.warn("pas de questions dans pas de réponse à sauvegarder");
            return false;
        }

        if (quizQuestion.getCorrectAnswer() == null || quizQuestion.getCorrectAnswer() < 0 || quizQuestion.getCorrectAnswer() > 3) {
            log.warn("index de la réponse correcte manquante");
            throw new IllegalArgumentException("Index de la réponse correcte invalide");
        }

        int indexAnswer = 0;

        for (String answerText : quizQuestion.getAnswers()) {
            Answer answer = new Answer();
            answer.setText(answerText);
            answer.setQuestion(question);
            answer.setIsCorrect(indexAnswer == quizQuestion.getCorrectAnswer());
            Answer savedAnswer =  answerRepository.save(answer);

            if (savedAnswer == null) {
                log.warn("échec de la sauvegarde de la réponse: {}", answerText);
                throw new RuntimeException("Erreur lors de la sauvegarde de la réponse");
            }

            indexAnswer++;
        }

        log.info("réponses bien sauvegardées");
        return true;

    }

}