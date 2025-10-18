package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesGenerateResponse;
import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.model.User;

import java.util.List;

public interface BlocService {

    List<Bloc> getBlocByUserId(Integer userId);

    List<Bloc> getFavoriteBlocsByUserId(Integer userId);

    Boolean saveBloc(User user, Course course, CapsulesGenerateResponse aiResponse);

}