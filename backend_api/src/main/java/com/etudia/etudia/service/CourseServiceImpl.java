package com.etudia.etudia.service;

import com.etudia.etudia.model.Course;
import com.etudia.etudia.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getCoursesByUserId(Integer userId) {
        return courseRepository.findByUser_Id(userId);
    }

}