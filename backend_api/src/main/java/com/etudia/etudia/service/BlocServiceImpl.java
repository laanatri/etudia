package com.etudia.etudia.service;

import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.repository.BlocRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BlocServiceImpl implements BlocService {

    private BlocRepository blocRepository;

    @Override
    public List<Bloc> getBlocByUserId(Integer userId) {
        return blocRepository.findByUser_id(userId);
    }


}
