package com.etudia.etudia.service;

import com.etudia.etudia.dto.AnswerDto;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.QuestionDto;
import com.etudia.etudia.model.Answer;
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
    public List<QuestionDto> getQuestionsByQuizId(Integer quizId) {
        List<Question> questions = questionRepository.findByQuizId(quizId);
        if (questions == null || questions.isEmpty()) {
            log.info("Aucune question trouvée pour le quiz id: {}", quizId);
            return List.of();
        }

        return questions.stream().map(question -> {
            List<Answer> answers = answerService.getAnswersByQuestionId(question.getId());

            List<AnswerDto> answerDtos = (answers == null || answers.isEmpty())
                ? List.of()
                : answers.stream().map(answer -> {
                    AnswerDto answerDto = new AnswerDto();
                    answerDto.setId(answer.getId());
                    answerDto.setText(answer.getText());
                    answerDto.setIsCorrect(answer.getIsCorrect());
                    return answerDto;
            }).toList();

            QuestionDto dto = new QuestionDto();
            dto.setId(question.getId());
            dto.setText(question.getText());
            dto.setQuizId(question.getQuiz() != null ? question.getQuiz().getId() : null);
            dto.setAnswers(answerDtos);
            return dto;
        }).toList();
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