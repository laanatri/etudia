package com.etudia.etudia.dto;

import lombok.Data;

@Data
public class CapsulesCreateRequest {

    private CourseInfos course;
    private CapsulesInfos capsules;
    private Integer user_id;
    private Integer course_id;

    @Data
    public static class CourseInfos {
        private String name;
        private String courseUrl;
    }

    @Data
    public static class CapsulesInfos {
        private FlashcardCapsule flashcard;
        private SummaryCapsule summary;
        private QuizCapsule quiz;
    }

    @Data
    public static class FlashcardCapsule {
        private boolean create;
        private Integer number;
    }

    @Data
    public static class SummaryCapsule {
        private boolean create;
    }

    @Data
    public static class QuizCapsule {
        private boolean create;
        private Integer number;
    }

}