package com.etudia.etudia;

import com.etudia.etudia.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;

@ExtendWith(MockitoExtension.class)
public class CapsuleServiceImplTest {

    @Mock
    AIService aiService;
    @Mock
    UserServiceImpl userServiceImpl;
    @Mock
    CourseServiceImpl courseServiceImpl;
    @Mock
    BlocService blocService;
    @Mock
    SummaryService summaryService;
    @Mock
    QuizService quizService;

    @InjectMocks
    CapsuleServiceImpl capsuleService;

    @Test
    void shouldReturnFalseWhenRequestIsNull() {
        Boolean result = capsuleService.createCapsules(null);
        assertFalse(result);
    }

}