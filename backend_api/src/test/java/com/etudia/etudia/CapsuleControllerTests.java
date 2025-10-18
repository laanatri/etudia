package com.etudia.etudia;

import com.etudia.etudia.controller.CapsuleController;
import com.etudia.etudia.service.CapsuleService;
import com.etudia.etudia.dto.CapsulesCreateRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class CapsuleControllerTests {

    @Mock
    CapsuleService capsuleService;

    @InjectMocks
    CapsuleController capsuleController;

    @Test
    void shouldReturnOkWhenServiceReturnsTrue() {
        when(capsuleService.createCapsules(any())).thenReturn(true);

        ResponseEntity<Boolean> response = capsuleController.newCapsules(new CapsulesCreateRequest());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody());
    }

    @Test
    void shouldReturnInternalServerErrorWhenServiceReturnsFalse() {
        when(capsuleService.createCapsules(any())).thenReturn(false);

        ResponseEntity<Boolean> response = capsuleController.newCapsules(new CapsulesCreateRequest());

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertFalse(response.getBody());
    }

}