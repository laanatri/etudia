package com.etudia.etudia.dto;

import lombok.Data;

@Data
public class AnswerDto {
    private Integer id;
    private String text;
    private Boolean isCorrect;
}