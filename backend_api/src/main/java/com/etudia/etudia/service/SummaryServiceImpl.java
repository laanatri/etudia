package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.SummaryDto;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.Quiz;
import com.etudia.etudia.model.Summary;
import com.etudia.etudia.model.User;
import com.etudia.etudia.repository.SummaryRepository;
import com.etudia.etudia.utils.CleanFileName;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@AllArgsConstructor
public class SummaryServiceImpl implements SummaryService {

    private final SummaryRepository summaryRepository;
    private final SupabaseStorageService supabaseStorageService;

    @Override
    public List<SummaryDto> getSummaryByUserId(Integer userId, boolean favorite) {
        List<Summary> summaries;
        if (favorite) {
            summaries = summaryRepository.findByCourseUserIdAndFavoriteTrue(userId);
        } else {
            summaries = summaryRepository.findByCourseUserId(userId);
        }
        return summaries.stream().map(summary -> {
            SummaryDto dto = new SummaryDto();
            dto.setId(summary.getId());
            dto.setName(summary.getName());
            dto.setThemes(summary.getThemes());
            dto.setSummaryUrl(summary.getSummaryUrl());
            dto.setCreatedAt(summary.getCreatedAt());
            dto.setIsFavorite(summary.getIsFavorite());
            return dto;
        }).toList();
    }

    @Override
    public boolean saveSummary(User user, Course course, CapsulesGenerateResponse aiResponse) {

            Objects.requireNonNull(course, "course ne doit pas être null");

            // on stock le summary sur storage supabase
            String summaryUrl = "";

            if (aiResponse != null && aiResponse.getCapsules() != null && aiResponse.getCapsules().getSummary() != null) {
                String titleForPath = aiResponse.getTitle() != null ? aiResponse.getTitle() : "summary.txt";
                String cleanedTitle = CleanFileName.clean(titleForPath);
                summaryUrl = supabaseStorageService.storeSummary("summaries", cleanedTitle, aiResponse.getCapsules().getSummary());
            }

            if (summaryUrl == null || summaryUrl.isEmpty()) {
                log.error("Le stockage du résumé a échoué.");
                throw new RuntimeException("Erreur lors du stockage du résumé, summaryUrl est vide");
            }

            // on sauvegarde le summary
            Summary newSummary = Summary.builder()
                    .name(aiResponse.getTitle() != null ? aiResponse.getTitle() : "Bloc de flashcards")
                    .themes(aiResponse.getThemes() != null ? aiResponse.getThemes() : "")
                    .summaryUrl(summaryUrl)
                    .course(course)
                    .build();

            Summary savedSummary = summaryRepository.save(newSummary);

            if (savedSummary == null) {
                log.error("La sauvegarde du résumé a échoué.");
                throw new RuntimeException("Erreur lors de la sauvegarde du résumé");
            }

            return true;

    }

    @Override
    public void toggleFavorite(Integer summaryId) {
        Summary summary = summaryRepository.findById(summaryId)
                .orElseThrow(() -> new RuntimeException("summary not found with id: " + summaryId));

        summary.setIsFavorite(!summary.getIsFavorite());
        summaryRepository.save(summary);
    };

}