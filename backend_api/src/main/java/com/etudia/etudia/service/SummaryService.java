package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.dto.SummaryDto;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;

import java.util.List;

public interface SummaryService {

    List<SummaryDto> getSummaryByUserId(Integer userdId, boolean isFavorite);

    boolean saveSummary(User user, Course course, CapsulesGenerateResponse aiResponse);

    void toggleFavorite(Integer summaryId);

}