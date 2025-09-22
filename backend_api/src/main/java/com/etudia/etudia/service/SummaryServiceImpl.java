package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import com.etudia.etudia.model.Summary;
import com.etudia.etudia.repository.SummaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SummaryServiceImpl implements SummaryService {

    private SummaryRepository summaryRepository;

    @Override
    public List<Summary> getSummaryByUserId(Integer userId) {return summaryRepository.findByUser_id(userId);}

    @Override
    public boolean saveSummary(CapsulesCreateRequest capsulesCreateRequest) {

//        if (capsulesCreateRequest.capsules.summary.create) {
//
//
//
//
//
//        }





        return true;





    }

}