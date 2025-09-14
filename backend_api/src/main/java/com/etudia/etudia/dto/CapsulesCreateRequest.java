package com.etudia.etudia.dto;

public class CapsulesCreateRequest {

    public CourseInfos course;
    public CapsulesInfos capsules;
    public Integer user_id;
    public Integer course_id;

    public static class CourseInfos {
        public String name;
        public String courseUrl;
    }

    public static class CapsulesInfos {
        public FlashcardCapsule flashcard;
        public SummaryCapsule summary;
        public QuizzCapsule quizz;
    }

    public static class FlashcardCapsule {
        public boolean create;
        public Integer number;
    }

    public static class SummaryCapsule {
        public boolean create;
    }

    public static class QuizzCapsule {
        public boolean create;
        public Integer number;
    }

}