package com.etudia.etudia.service;

import com.etudia.etudia.dto.CourseDto;
import com.etudia.etudia.model.Course;

import java.util.List;

public interface CourseService {

    Course saveCourse(Course course);

    List<CourseDto> getCoursesByUserId(Integer userId);

    CourseDto readCourse(Integer courseId);

    Course getCourseById(Integer courseId);

}