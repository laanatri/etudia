package com.etudia.etudia.service;

import com.etudia.etudia.dto.FlashcardGenerateResponse;

public interface AIService {

    public FlashcardGenerateResponse generateFlashcards(String courseUrl, int count);
}
