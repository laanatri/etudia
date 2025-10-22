package com.etudia.etudia.service;

import com.etudia.etudia.model.Bloc;
import com.etudia.etudia.model.Reading;
import com.etudia.etudia.repository.BlocRepository;
import com.etudia.etudia.repository.ReadingRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class ReadingServiceImpl implements ReadingService {

    private final ReadingRepository readingRepository;
    private final BlocRepository blocRepository;

    @Override
    public Integer createReading(Integer score, Integer blocId) {
        Bloc bloc = blocRepository.findById(blocId)
                .orElseThrow(() -> new IllegalArgumentException("Bloc not found with id: " + blocId));
        Reading reading = new Reading();
        reading.setScore(score);
        reading.setBloc(bloc);
        reading = readingRepository.save(reading);
        return reading.getScore();
    };

}
