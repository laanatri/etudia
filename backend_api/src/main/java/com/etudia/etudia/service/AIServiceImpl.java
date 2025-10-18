package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateRequest;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
public class AIServiceImpl implements AIService {

    private final WebClient webClient;

    public AIServiceImpl(@Qualifier("capsulesWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public CapsulesGenerateResponse generateCapsules(CapsulesGenerateRequest capsulesGenerateRequest) {

        try  {

            CapsulesGenerateResponse capsulesGenerateResponse = webClient.post()
                    .uri("/generate/capsules")
                    .bodyValue(capsulesGenerateRequest)
                    .retrieve()
                    .bodyToMono(CapsulesGenerateResponse.class)
                    .block();

            if (capsulesGenerateResponse != null) {
                return capsulesGenerateResponse;
            } else {
                throw new RuntimeException("Échec de la génération des capsules");
            }

        } catch (Exception e) {
            throw new RuntimeException("Échec de la génération des capsules", e);
        }
    }
}