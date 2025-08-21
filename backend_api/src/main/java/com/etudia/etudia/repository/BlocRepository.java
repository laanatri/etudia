package com.etudia.etudia.repository;

import com.etudia.etudia.model.Bloc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlocRepository extends JpaRepository<Bloc,Integer> {

    @Query("SELECT b FROM Bloc b JOIN b.user u WHERE u.id = :userId")
    List<Bloc> findByUser_id(@Param("userId") Integer userId);

}