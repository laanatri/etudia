package com.etudia.etudia.controller;

import com.etudia.etudia.dto.FlashCardDto;
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

    private final FlashCardService flashCardService;

    @GetMapping("/bloc/{bloc_id}")
    public List<FlashCardDto> findByBloc_id(@PathVariable("bloc_id") Integer bloc_id) {
        return flashCardService.getFlashCardsByBlocId(bloc_id);
    }

}
