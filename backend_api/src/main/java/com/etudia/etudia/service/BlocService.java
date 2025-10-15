package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.model.Bloc;

import java.util.List;

public interface BlocService {

    List<Bloc> getBlocByUserId(Integer userId);

    List<Bloc> getFavoriteBlocsByUserId(Integer userId);

    Boolean saveBloc(CapsulesCreateRequest capsulesCreateRequest);

}