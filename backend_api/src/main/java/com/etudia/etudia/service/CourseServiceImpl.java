package com.etudia.etudia.service;

import com.etudia.etudia.dto.CourseDto;
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

    public CourseDto toDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setName(course.getName());
        dto.setCourseUrl(course.getCourseUrl());
        dto.setCreatedAt(course.getCreatedAt());
        return dto;
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<CourseDto> getCoursesByUserId(Integer userId) {
        List<Course> courses = courseRepository.findByUser_Id(userId);
        return courses.stream().map(this::toDto).toList();
    }

    @Override
    public CourseDto readCourse(Integer courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        return course.map(this::toDto).orElse(null);
    }

    @Override
    public Course getCourseById(Integer courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));
    }

}