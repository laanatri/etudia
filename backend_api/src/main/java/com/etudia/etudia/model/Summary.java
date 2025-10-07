package com.etudia.etudia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "summaries")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Summary extends Capsule {

    @Column(name = "summary_url", nullable = false, length = 255)
    private String summaryUrl;

}