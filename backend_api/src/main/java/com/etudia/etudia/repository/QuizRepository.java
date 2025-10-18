package com.etudia.etudia.repository;

import com.etudia.etudia.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer> {

    List<Quiz> findByCourseUserId(Integer userId);

    @Query("SELECT q FROM Quiz q WHERE q.course.user.id = :userId AND q.isFavorite = true")
    List<Quiz> findByCourseUserIdAndFavoriteTrue(Integer userId);

}
