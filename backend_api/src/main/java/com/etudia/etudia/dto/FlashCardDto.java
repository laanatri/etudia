package com.etudia.etudia.dto;

import lombok.Data;

@Data
public class FlashCardDto {
    private Integer id;
    private String question;
    private String answer;
    private Integer blocId;
}