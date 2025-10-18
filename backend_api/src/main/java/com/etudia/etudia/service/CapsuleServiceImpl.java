package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.dto.CapsulesGenerateRequest;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class CapsuleServiceImpl implements CapsuleService {

    private final AIService aIService;
    private final UserServiceImpl userServiceImpl;
    private final CourseServiceImpl courseServiceImpl;
    private final BlocService blocService;
    private final SummaryService summaryService;
    private final QuizService quizService;

    @Transactional
    public Boolean createCapsules(CapsulesCreateRequest capsulesCreateRequest) {

        if (capsulesCreateRequest == null) {
            log.error("aucunes données reçues pour la création des capsules");
            return false;
        }

        boolean success = true;

        try {

            CapsulesGenerateRequest capsulesGenerateRequest = CapsulesGenerateRequest.builder()
                    .course_url(capsulesCreateRequest.getCourse().getCourseUrl())
                    .capsules(CapsulesGenerateRequest.CapsulesConfig.builder()
                            .bloc(CapsulesGenerateRequest.BlocConfig.builder()
                                    .create(capsulesCreateRequest.getCapsules().getFlashcard().isCreate())
                                    .number(capsulesCreateRequest.getCapsules().getFlashcard().getNumber())
                                    .build())
                            .summary(CapsulesGenerateRequest.SummaryConfig.builder()
                                    .create(capsulesCreateRequest.getCapsules().getSummary().isCreate())
                                    .build())
                            .quiz(CapsulesGenerateRequest.QuizConfig.builder()
                                    .create(capsulesCreateRequest.getCapsules().getQuiz().isCreate())
                                    .number(capsulesCreateRequest.getCapsules().getQuiz().getNumber())
                                    .build())
                            .build())
                    .build();

            CapsulesGenerateResponse aiResponse = aIService.generateCapsules(capsulesGenerateRequest);

            if (aiResponse == null) {
                log.error("réponse IA nulle pour la création des capsules");
                return false;
            }

            User currentUser = userServiceImpl.readUser(capsulesCreateRequest.getUser_id());
            Course course = courseServiceImpl.readCourse(capsulesCreateRequest.getCourse_id());

            // Flashcards
            if (capsulesCreateRequest.getCapsules().getFlashcard().isCreate()) {

                boolean flashcardOk = blocService.saveBloc(currentUser, course, aiResponse);
                if (!flashcardOk) {
                    success = false;
                }

            }

            // Summary
            if (capsulesCreateRequest.getCapsules().getSummary().isCreate()) {

                boolean summaryOk = summaryService.saveSummary(currentUser, course, aiResponse);
                if (!summaryOk) {
                    success = false;
                }

            }

            // Quiz
            if (capsulesCreateRequest.getCapsules().getQuiz().isCreate()) {

                boolean quizOk = quizService.saveQuiz(currentUser, course, aiResponse);
                if (!quizOk) {
                    success = false;
                }

            }

        } catch (Exception e) {
            throw new RuntimeException("erreur lors de la création des capsules", e);
        }

        return success;
    }
}