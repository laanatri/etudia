package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.Summary;
import com.etudia.etudia.model.User;

import java.util.List;

public interface SummaryService {

    List<Summary> getSummaryByUserId(Integer user_id);

    List<Summary> getFavoritesummariesByUserId(Integer user_id);

    boolean saveSummary(User user, Course course, CapsulesGenerateResponse aiResponse);

}