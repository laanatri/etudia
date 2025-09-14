package com.etudia.etudia.service;

import com.etudia.etudia.model.Course;
import com.etudia.etudia.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Course readCourse(Integer courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        return course.orElse(null);
    }

}