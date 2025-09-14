package com.etudia.etudia.controller;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.service.CapsuleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/capsule")
@AllArgsConstructor
public class CapsuleController {

    private final CapsuleService capsuleService;

    @PostMapping("/create")
    public ResponseEntity<Boolean> newCapsules(@RequestBody CapsulesCreateRequest capsulesCreateRequest) {
        try {
            boolean result = capsuleService.createCapsules(capsulesCreateRequest);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}