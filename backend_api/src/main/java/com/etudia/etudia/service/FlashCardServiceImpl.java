package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.FlashCardDto;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.repository.FlashCardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class FlashCardServiceImpl implements FlashCardService {

    private final FlashCardRepository flashCardRepository;

    @Override
    @Transactional(readOnly = true)
    public List<FlashCardDto> getFlashCardsByBlocId(Integer blocId) {
        List<FlashCard> flashcards = flashCardRepository.findByBlocId(blocId);
        if (flashcards == null || flashcards.isEmpty()) {
            log.info("Aucune flashcard trouvée pour le bloc id: {}", blocId);
            return new ArrayList<>();
        }
        return flashcards.stream().map(flashcard -> {
            FlashCardDto dto = new FlashCardDto();
            dto.setId(flashcard.getId());
            dto.setQuestion(flashcard.getTitle());
            dto.setAnswer(flashcard.getContent());
            dto.setBlocId(flashcard.getBloc() != null ? flashcard.getBloc().getId() : null);
            return dto;
        }).toList();
    }

    @Override
    @Transactional
    public boolean saveFlashCards(List<CapsulesGenerateResponse.FlashcardDto> flashcards, Bloc bloc) {

        if (flashcards == null || flashcards.isEmpty() || bloc == null) {
            log.warn("pas de flashcards à sauvegarder ou bloc est null");
            return false;
        }

        try {

            List<FlashCard> flashCardsToSave = new ArrayList<>();

            for (CapsulesGenerateResponse.FlashcardDto cardData : flashcards) {
                FlashCard flashCard = new FlashCard();
                flashCard.setTitle(cardData.getQuestion());
                flashCard.setContent(cardData.getAnswer());
                flashCard.setBloc(bloc);
                flashCardsToSave.add(flashCard);
            }

            flashCardRepository.saveAll(flashCardsToSave);
            log.info("flashcards bien sauvegardées");
            return true;
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde des flashcards", e.getMessage());
            return false;
        }
    }

}