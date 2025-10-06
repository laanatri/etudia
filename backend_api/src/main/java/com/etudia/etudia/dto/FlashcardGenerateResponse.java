package com.etudia.etudia.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class FlashcardGenerateResponse {

    private String title;
    private String themes;
    private List<Map<String, String>> flashcards;
    private Map<String, String> meta;

}