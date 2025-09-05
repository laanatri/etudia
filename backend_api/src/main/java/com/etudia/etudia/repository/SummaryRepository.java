package com.etudia.etudia.repository;

import com.etudia.etudia.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<Summary,Integer> {

    @Query("SELECT s FROM Summary s JOIN s.user u WHERE u.id = :userId")
    List<Summary> findByUser_id(@Param("userId") Integer userId);
}
