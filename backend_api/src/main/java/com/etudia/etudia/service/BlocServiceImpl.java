package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.FlashcardGenerateResponse;
import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.BlocRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BlocServiceImpl implements BlocService {

    private final AIService aIService;
    private final BlocRepository blocRepository;
    private final UserServiceImpl userServiceImpl;
    private final CourseServiceImpl courseServiceImpl;
    private final FlashCardService flashCardService;


    @Override
    public List<Bloc> getBlocByUserId(Integer userId) {
        return blocRepository.findByUser_id(userId);
    }

    @Override
    @Transactional
    public Boolean saveBloc(CapsulesCreateRequest capsulesCreateRequest) {
        if (!capsulesCreateRequest.capsules.flashcard.create) {
            return false;
        }

        try {
            FlashcardGenerateResponse aiResponse = aIService.generateFlashcards(capsulesCreateRequest.course.courseUrl, capsulesCreateRequest.capsules.flashcard.number);
            if (aiResponse.getFlashcards() == null || aiResponse.getFlashcards().isEmpty()) {
                return false;
            }

            User currentUser = userServiceImpl.readUser(capsulesCreateRequest.user_id);
            Course course = courseServiceImpl.readCourse(capsulesCreateRequest.course_id);

            Bloc newBloc = new Bloc();
            newBloc.setName(aiResponse.getTitle() != null ? aiResponse.getTitle() : "Bloc de flashcards");
            newBloc.setThemes(aiResponse.getThemes() != null ? aiResponse.getThemes() : "");
            newBloc.setUser(currentUser);
            newBloc.setCourse(course);

            Bloc savedBloc = blocRepository.save(newBloc);

            boolean flashcardsSuccess = flashCardService.saveFlashCards(aiResponse, savedBloc);

            if (!flashcardsSuccess) {
                log.error("La sauvegarde des flashcards a échoué.");
            }

            return true;
        } catch(Exception e) {
            log.error("Erreur à la création des flashcards :{}", e.getMessage());
            return false;
        }
    }

}