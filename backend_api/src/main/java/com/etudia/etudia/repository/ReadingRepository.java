package com.etudia.etudia.repository;

import com.etudia.etudia.model.Reading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadingRepository extends JpaRepository<Reading,Integer> {

    @Query("SELECT MAX(r.score) FROM Reading r WHERE r.bloc.id = :blocId")
    Integer findBestScoreByBlocId(Integer blocId);

}