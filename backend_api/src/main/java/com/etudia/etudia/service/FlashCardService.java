package com.etudia.etudia.service;

import com.etudia.etudia.model.FlashCard;

import java.util.List;

public interface FlashCardService {

    List<FlashCard> getFlashCardsByBlocId(Integer blocId);

}