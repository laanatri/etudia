package com.etudia.etudia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Quiz extends Capsule {

}