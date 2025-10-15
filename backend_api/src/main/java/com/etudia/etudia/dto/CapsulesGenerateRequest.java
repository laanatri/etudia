package com.etudia.etudia.dto;

import lombok.Data;

@Data
public class CapsulesGenerateRequest {

    private String course_url;
    private CapsulesConfig capsules;

    @Data
    public static class CapsulesConfig {
        private BlocConfig bloc;
        private SummaryConfig summary;
        private QuizConfig quiz;
    }

    @Data
    public static class BlocConfig {
        private boolean create;
        private Integer number;
    }

    @Data
    public static class SummaryConfig {
        private boolean create;
    }

    @Data
    public static class QuizConfig {
        private boolean create;
        private Integer number;
    }

}