package com.etudia.etudia.service;

import com.etudia.etudia.model.Summary;

import java.util.List;

public interface SummaryService {

    List<Summary> getSummaryByUserId(Integer user_id);

}