package com.etudia.etudia.repository;

import com.etudia.etudia.model.Bloc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlocRepository extends JpaRepository<Bloc,Integer> {

    List<Bloc> findByCourseUserId(Integer userId);

    @Query("SELECT b FROM Bloc b WHERE b.course.user.id = :userId AND b.isFavorite = true")
    List<Bloc> findByCourseUserIdAndFavoriteTrue(Integer userId);

}