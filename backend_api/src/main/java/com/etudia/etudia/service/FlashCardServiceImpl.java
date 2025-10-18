package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.repository.FlashCardRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class FlashCardServiceImpl implements FlashCardService {

    private FlashCardRepository flashCardRepository;

    @Override
    public List<FlashCard> getFlashCardsByBlocId(Integer blocId) {
        return flashCardRepository.findByBlocId(blocId);
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