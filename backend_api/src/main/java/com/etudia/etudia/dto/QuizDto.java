package com.etudia.etudia.dto;

import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class QuizDto {
    private Integer id;
    private String name;
    private String themes;
    private OffsetDateTime createdAt;
    private Boolean isFavorite;
    private Integer bestScore;
}