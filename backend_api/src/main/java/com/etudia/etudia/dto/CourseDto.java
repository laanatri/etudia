package com.etudia.etudia.dto;

import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class CourseDto {
    private Integer id;
    private String name;
    private String courseUrl;
    private OffsetDateTime createdAt;
}