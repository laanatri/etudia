package com.etudia.etudia.controller;

import com.etudia.etudia.dto.ReadingRequestDto;
import com.etudia.etudia.service.ReadingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reading")
@AllArgsConstructor
public class ReadingController {

    private ReadingService readingService;

    @PostMapping("/create")
    public Integer createReading(@RequestBody ReadingRequestDto request) {
        return readingService.createReading(request.getScore(), request.getBlocId());
    }

}