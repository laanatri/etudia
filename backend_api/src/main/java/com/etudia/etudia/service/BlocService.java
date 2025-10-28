package com.etudia.etudia.service;

import com.etudia.etudia.dto.BlocDto;
import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;

import java.util.List;

public interface BlocService {

    List<BlocDto> getBlocByUserId(Integer userId, boolean favorite);

    Boolean saveBloc(User user, Course course, CapsulesGenerateResponse aiResponse);

    void toggleFavorite(Integer blocId);

}