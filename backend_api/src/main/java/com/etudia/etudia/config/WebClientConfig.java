package com.etudia.etudia.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @Value("${ai.service.key}")
    private String aiServiceKey;

    @Bean
    public WebClient flashcardsWebClient() {
        return WebClient.builder()
                .baseUrl(aiServiceUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("x-service-key", aiServiceKey)
                .build();
    }

}