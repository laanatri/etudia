package com.etudia.etudia.dto;

public class CapsulesGenerateRequest {

    private String course_url;
    private CapsulesConfig capsules;

    public static class CapsulesConfig {
        private BlocConfig bloc;
        private SummaryConfig summary;
        private QuizConfig quiz;
    }

    public static class BlocConfig {
        public boolean create;
        public Integer number;
    }

    public static class SummaryConfig {
        public boolean create;
    }

    public static class QuizConfig {
        public boolean create;
        public Integer number;
    }

}