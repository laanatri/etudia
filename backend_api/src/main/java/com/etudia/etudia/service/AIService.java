package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateRequest;
import com.etudia.etudia.dto.CapsulesGenerateResponse;

public interface AIService {

    public CapsulesGenerateResponse generateCapsules(CapsulesGenerateRequest capsulesGenerateRequest);

}