const express = require('express');
const { getAllCourses, getCourse, updateCourse, createCourse, deleteCourse } = require('../controllers/course.controllers');
const router = express.Router();


router.route('/')
            .get(getAllCourses)
            .post(createCourse);



router.route('/:courseID')
            .get(getCourse)
            .patch(updateCourse)
            .delete(deleteCourse);
            
module.exports = router