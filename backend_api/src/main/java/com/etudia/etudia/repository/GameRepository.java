package com.etudia.etudia.repository;

import com.etudia.etudia.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game,Integer> {

    @Query("SELECT MAX(g.score) FROM Game g WHERE g.quiz.id = :quizId")
    Integer findBestScoreByQuizId(Integer quizId);

}