package com.etudia.etudia.repository;

import com.etudia.etudia.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<Summary,Integer> {

    List<Summary> findByCourseUserId(Integer userId);

}