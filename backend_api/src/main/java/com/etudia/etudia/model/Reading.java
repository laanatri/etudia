package com.etudia.etudia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Table(name = "readings")
@Getter
@Setter
@NoArgsConstructor
public class Reading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer acquisitionPourcentage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bloc_id")
    private Bloc bloc;

    @Column(name = "read_at", insertable = false, updatable = false)
    private OffsetDateTime readAt;

    public Reading(Integer acquisitionPourcentage, Bloc bloc) {
        this.acquisitionPourcentage = acquisitionPourcentage;
        this.bloc = bloc;
    }

}