package com.etudia.etudia.service;

import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.model.FlashcardGenerateResponse;

import java.util.List;

public interface FlashCardService {

    List<FlashCard> getFlashCardsByBlocId(Integer blocId);

    boolean saveFlashCards(FlashcardGenerateResponse response, Bloc bloc);

}