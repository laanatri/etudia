package com.etudia.etudia.dto;

import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class SummaryDto {
    private Integer id;
    private String name;
    private String themes;
    private String summaryUrl;
    private OffsetDateTime createdAt;
    private Boolean isFavorite;
}