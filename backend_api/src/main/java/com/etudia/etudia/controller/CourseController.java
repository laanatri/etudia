package com.etudia.etudia.controller;

import com.etudia.etudia.dto.CourseDto;
import com.etudia.etudia.model.Course;
import com.etudia.etudia.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseController {

    private CourseService courseService;

    @PostMapping("/create")
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @GetMapping("/user/{user_id}")
    public List<CourseDto> getCourses(@PathVariable Integer user_id) {
        return courseService.getCoursesByUserId(user_id);
    }

    @GetMapping("/read/{course_id}")
    public CourseDto getCourse(@PathVariable Integer course_id) {
        return courseService.readCourse(course_id);
    }

}