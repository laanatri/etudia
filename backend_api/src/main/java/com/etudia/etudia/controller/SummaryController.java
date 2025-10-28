package com.etudia.etudia.controller;

import com.etudia.etudia.dto.SummaryDto;
import com.etudia.etudia.model.Summary;
import com.etudia.etudia.service.SummaryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/summary")
@AllArgsConstructor
public class SummaryController {

    private SummaryService summaryService;

    @GetMapping("/user/{user_id}")
    public List<SummaryDto> getSummary(@PathVariable Integer user_id, @RequestParam(required = false) boolean favorite) {
        return summaryService.getSummaryByUserId(user_id, favorite);
    }

    @PatchMapping("/favorite/{summary_id}")
    public void toggleFavorite(@PathVariable Integer summary_id) {
        summaryService.toggleFavorite(summary_id);
    }

}