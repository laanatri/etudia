package com.etudia.etudia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "blocs")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Bloc extends Capsule {

}