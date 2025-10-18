package com.etudia.etudia.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CapsulesGenerateRequest {

    private String course_url;
    private CapsulesConfig capsules;

    @Data
    @Builder
    public static class CapsulesConfig {
        private BlocConfig bloc;
        private SummaryConfig summary;
        private QuizConfig quiz;
    }

    @Data
    @Builder
    public static class BlocConfig {
        private boolean create;
        private Integer number;
    }

    @Data
    @Builder
    public static class SummaryConfig {
        private boolean create;
    }

    @Data
    @Builder
    public static class QuizConfig {
        private boolean create;
        private Integer number;
    }

}