package com.etudia.etudia.service;

import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.dto.FlashcardGenerateResponse;
import com.etudia.etudia.repository.BlocRepository;
import com.etudia.etudia.repository.FlashCardRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class FlashCardServiceImpl implements FlashCardService {

    private final BlocRepository blocRepository;
    private FlashCardRepository flashCardRepository;

    @Override
    public List<FlashCard> getFlashCardsByBlocId(Integer blocId) {
        return flashCardRepository.findByBlocId(blocId);
    }

    @Override
    @Transactional
    public boolean saveFlashCards(FlashcardGenerateResponse response, Bloc bloc) {
        if (response == null || response.getFlashcards() == null || response.getFlashcards().isEmpty()) {
            return false;
        }

        try {

            List<FlashCard> flashCards = new ArrayList<>();

            for (Map<String, String> cardData : response.getFlashcards()) {
                FlashCard flashCard = new FlashCard();
                flashCard.setTitle(cardData.get("question"));
                flashCard.setContent(cardData.get("answer"));
                flashCard.setBloc(bloc);
                flashCards.add(flashCard);
            }

            flashCardRepository.saveAll(flashCards);
            return true;
        } catch (Exception e) {
            return false;
        }
    };

}