package com.etudia.etudia.repository;

import com.etudia.etudia.model.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard,Integer> {

    List<FlashCard> findByBlocId(Integer blocId);

}