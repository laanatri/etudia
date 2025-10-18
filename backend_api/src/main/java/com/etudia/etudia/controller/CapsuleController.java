package com.etudia.etudia.controller;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.service.CapsuleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/capsule")
@AllArgsConstructor
@Slf4j
public class CapsuleController {

    private final CapsuleService capsuleService;

    @PostMapping("/create")
    public ResponseEntity<Boolean> newCapsules(@RequestBody CapsulesCreateRequest capsulesCreateRequest) {

        try {
            boolean result = capsuleService.createCapsules(capsulesCreateRequest);

            if (!result) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
            }

            return ResponseEntity.ok(true);

        } catch (IllegalArgumentException e) {
            log.error("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(false);
        }
        catch (Exception e) {
            log.error("Erreur", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }

    }

}