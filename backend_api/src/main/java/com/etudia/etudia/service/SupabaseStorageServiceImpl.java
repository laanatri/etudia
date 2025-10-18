package com.etudia.etudia.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class SupabaseStorageServiceImpl implements SupabaseStorageService {

    private final WebClient webClient;
    private final String supabaseUrl;

    public SupabaseStorageServiceImpl(@Qualifier("supabaseWebClient") WebClient webClient, @Value("${supabase.url}") String supabaseUrl) {
        this.webClient = webClient;
        this.supabaseUrl = supabaseUrl.replaceAll("/+$", "");
    }

    @Override
    public String storeSummary(String bucket, String path, String content) {

        try {

            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("file", new ByteArrayResource(content.getBytes(StandardCharsets.UTF_8)) {
                @Override
                public String getFilename() {
                    return path;
                }
            }).header("Content-Type", "text/plain");

            String safePath = path.replaceAll("[^a-zA-Z0-9-_\\.]", "_");

            webClient.post()
                .uri("/storage/v1/object/{bucket}/{path}", bucket, path)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(String.class)
                .block();

            return supabaseUrl + "/storage/v1/object/public/" + bucket + "/" + safePath;

        } catch (Exception e) {
            throw new RuntimeException("Échec du storage du résumé", e);
        }

    }

}