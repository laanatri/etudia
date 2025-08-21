package com.etudia.etudia.service;

import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.repository.FlashCardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlashCardServiceImpl implements FlashCardService {

    private FlashCardRepository flashCardRepository;

    @Override
    public List<FlashCard> getFlashCardsByBlocId(Integer blocId) {
        return flashCardRepository.findByBlocId(blocId);
    }

}