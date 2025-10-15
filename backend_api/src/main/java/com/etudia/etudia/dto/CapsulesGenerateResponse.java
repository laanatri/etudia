package com.etudia.etudia.dto;

import lombok.Data;

import java.util.List;

@Data
public class CapsulesGenerateResponse {
    private String title;
    private String themes;
    private CapsulesDatas capsules;
    private MetaDatas meta;

    @Data
    public static class CapsulesDatas {

        private List<FlashcardDto> flashcards;
        private String summary;
        private List<QuizQuestionDto> quiz;

    }

    @Data
    public static class FlashcardDto {

        private String question;
        private String answer;

    }

    @Data
    public static class QuizQuestionDto {

        private String question;
        private List<String> answers;
        private Integer correctAnswer;

    }

    public static class MetaDatas {

        private Double processTime;
        private Integer promptTokens;
        private Integer tokensUsed;

    }

}