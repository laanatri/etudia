package com.etudia.etudia.service;

import com.etudia.etudia.dto.CapsulesCreateRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CapsuleServiceImpl implements CapsuleService {

    private BlocService blocService;
    private SummaryService summaryService;

    public Boolean createCapsules(CapsulesCreateRequest capsulesCreateRequest) {
        if (capsulesCreateRequest == null) {
            return false;
        }

        boolean success = true;

//      Flashcards
        if (capsulesCreateRequest.capsules.flashcard.create) {
            try {
                boolean flashcardOk = blocService.saveBloc(capsulesCreateRequest);
                if (!flashcardOk) {
                    success = false;
                }
            } catch (Exception e) {
                success = false;
            }
        }

//      Summaries
        if (capsulesCreateRequest.capsules.summary.create) {
            try {
                boolean summaryOk = summaryService.saveSummary(capsulesCreateRequest);
                if (!summaryOk) {
                    success = false;
                }
            } catch (Exception e) {
                success = false;
            }
        }

//      Quizz
        if (capsulesCreateRequest.capsules.quizz.create) {
            try {


                success = false;
            } catch (Exception e) {
                success = false;
            }
        }

        return success;
    }
}
