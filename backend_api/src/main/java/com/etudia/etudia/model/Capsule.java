package com.etudia.etudia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

public interface Capsule {

    Integer getId();
    void setId(Integer id);

    String getName();
    void setName(String name);

    String getThemes();
    void setThemes(String themes);

    User getUser();
    void setUser(User user);

    Course getCourse();
    void setCourse(Course course);

    OffsetDateTime getCreatedAt();
    void setCreatedAt(OffsetDateTime createdAt); // Add a setter for completeness, though often managed by DB

}