package com.etudia.etudia.dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;

import java.util.List;

@Data
public class QuestionDto {

    private Integer id;
    private String text;
    private Integer quizId;

    @Valid
    @Size(min = 4, max = 4)
    private List<AnswerDto> answers;

}