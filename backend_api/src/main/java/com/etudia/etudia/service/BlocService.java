package com.etudia.etudia.service;

import com.etudia.etudia.model.Bloc;

import java.util.List;

public interface BlocService {

    List<Bloc> getBlocByUserId(Integer userId);

}