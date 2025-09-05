package com.etudia.etudia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "summaries")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Summary extends Capsule {

    private String summaryUrl;

    public Summary(String name, String themes, User user, Course course, String summaryUrl) {
        super(name, themes, user, course);
        this.summaryUrl = summaryUrl;
    }

}