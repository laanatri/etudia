package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.FlashCard;

import java.util.List;

public interface FlashCardService {

    List<FlashCard> getFlashCardsByBlocId(Integer blocId);

    boolean saveFlashCards(List<CapsulesGenerateResponse.FlashcardDto> flashcards, Bloc bloc);

}