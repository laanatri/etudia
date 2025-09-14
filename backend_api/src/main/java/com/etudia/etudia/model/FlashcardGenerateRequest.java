package com.etudia.etudia.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardGenerateRequest {

    private String course_url;
    private int count;

}