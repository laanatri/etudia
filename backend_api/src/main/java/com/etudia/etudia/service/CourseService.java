package com.etudia.etudia.service;

import com.etudia.etudia.model.Course;

import java.util.List;

public interface CourseService {

    Course saveCourse(Course course);

    List<Course> getCoursesByUserId(Integer userId);

}