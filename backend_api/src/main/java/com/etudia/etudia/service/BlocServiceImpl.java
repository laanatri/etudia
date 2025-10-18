package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Course;
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

    private final BlocRepository blocRepository;
    private final FlashCardService flashCardService;

    @Override
    public List<Bloc> getBlocByUserId(Integer userId) {
        return blocRepository.findByCourseUserId(userId);
    }

    @Override
    public List<Bloc> getFavoriteBlocsByUserId(Integer userId) {
        return blocRepository.findByCourseUserIdAndFavoriteTrue(userId);
    };

    @Override
    @Transactional
    public Boolean saveBloc(User user, Course course, CapsulesGenerateResponse aiResponse) {

        try {

            Bloc newBloc = Bloc.builder()
                            .name(aiResponse.getTitle() != null ? aiResponse.getTitle() : "Bloc de flashcards")
                            .themes(aiResponse.getThemes() != null ? aiResponse.getThemes() : "")
                            .course(course)
                            .build();

            Bloc savedBloc = blocRepository.save(newBloc);

            boolean flashcardsSuccess = flashCardService.saveFlashCards(aiResponse.getCapsules().getFlashcards(), savedBloc);

            if (!flashcardsSuccess) {
                log.error("La sauvegarde des flashcards a échoué.");
                throw new RuntimeException("Erreur lors de la sauvegarde des flashcards");
            }

            return true;
        } catch(Exception e) {
            log.error("Erreur à la création des flashcards :{}", e.getMessage());
            return false;
        }

    }

}