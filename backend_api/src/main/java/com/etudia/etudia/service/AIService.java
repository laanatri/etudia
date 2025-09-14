package com.etudia.etudia.service;

import com.etudia.etudia.model.FlashcardGenerateResponse;

public interface AIService {

    public FlashcardGenerateResponse generateFlashcards(String courseUrl, int count);
}
