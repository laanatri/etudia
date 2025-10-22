package com.etudia.etudia.service;

import com.etudia.etudia.dto.BlocDto;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.BlocRepository;
import com.etudia.etudia.repository.ReadingRepository;
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
    private final ReadingRepository readingRepository;

    @Override
    public List<BlocDto> getBlocByUserId(Integer userId, boolean favorite) {
        List<Bloc> blocs;
        if (favorite) {
            blocs = blocRepository.findByCourseUserIdAndFavoriteTrue(userId);
        } else {
            blocs = blocRepository.findByCourseUserId(userId);
        }
        return blocs.stream().map(bloc -> {
            Integer bestScore = readingRepository.findBestScoreByBlocId(bloc.getId());
            if (bestScore == null) {
                bestScore = 0;
            }
            BlocDto dto = new BlocDto();
            dto.setId(bloc.getId());
            dto.setName(bloc.getName());
            dto.setThemes(bloc.getThemes());
            dto.setCreatedAt(bloc.getCreatedAt());
            dto.setIsFavorite(bloc.getIsFavorite());
            dto.setBestScore(bestScore);
            return dto;
        }).toList();
    }

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