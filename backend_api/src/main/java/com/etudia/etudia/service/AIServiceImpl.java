package com.etudia.etudia.service;

import com.etudia.etudia.dto.FlashcardGenerateRequest;
import com.etudia.etudia.dto.FlashcardGenerateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIServiceImpl implements AIService {

    private final WebClient webClient;

    @Override
    public FlashcardGenerateResponse generateFlashcards(String courseUrl, int count) {

        FlashcardGenerateRequest request = new FlashcardGenerateRequest(courseUrl, count);

        try  {

            FlashcardGenerateResponse response = webClient.post()
                    .uri("/generate/flashcards")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(FlashcardGenerateResponse.class)
                    .block();

            if (response != null) {
                return response;
            } else {
                throw new RuntimeException("Échec de la génération des flashcards");
            }

        } catch (Exception e) {
            throw new RuntimeException("Échec de la génération des flashcards", e);
        }
    }
}