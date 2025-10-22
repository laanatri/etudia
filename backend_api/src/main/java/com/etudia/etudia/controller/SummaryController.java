package com.etudia.etudia.controller;

import com.etudia.etudia.dto.SummaryDto;
import com.etudia.etudia.model.Summary;
import com.etudia.etudia.service.SummaryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}