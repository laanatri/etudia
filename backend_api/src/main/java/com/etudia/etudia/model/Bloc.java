package com.etudia.etudia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@DiscriminatorValue("BLOC")
@Getter
@Setter
@NoArgsConstructor
public class Bloc extends Capsule {

    public Bloc(String name, String themes, User user, Course course) {
        super(name, themes, user, course);
    }

}