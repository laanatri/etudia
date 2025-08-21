package com.etudia.etudia.controller;

import com.etudia.etudia.model.FlashCard;
import com.etudia.etudia.service.FlashCardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flashcard")
@AllArgsConstructor
public class FlashCardController {

    private FlashCardService flashCardService;

    @GetMapping("/read/{bloc_id}")
    public List<FlashCard> findByBloc_id(@PathVariable("bloc_id") Integer bloc_id) {
        return flashCardService.getFlashCardsByBlocId(bloc_id);
    }

}
