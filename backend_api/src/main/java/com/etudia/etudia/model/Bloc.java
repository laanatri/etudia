package com.etudia.etudia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blocs")
@Getter
@Setter
@NoArgsConstructor
public class Bloc implements Capsule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String themes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference("user_blocs")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @JsonBackReference("course_blocs")
    private Course course;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;


    public Bloc(String name, String themes, User user, Course course, String content) {
        this.name = name;
        this.themes = themes;
        this.user = user;
        this.course = course;
    }

}