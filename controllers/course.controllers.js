const Course = require('../model/course.model');
const { httpResponse, errHandle } = require('../utility/utility');
const asyncWrapper = require('../middleware/middleware');


const getAllCourses = asyncWrapper(async (req, res) => {
    const courses = await Course.find();
    !courses ? res.json(errHandle('Error', 401, 'courses can not get'))
        : res.status(200).json(httpResponse('success', courses));
});


const getCourse = asyncWrapper(async (req, res, next) => {
    const course = await Course.findById(req.params.courseID);
    !course ? res.json(errHandle('Error', 401, 'invalid ObjectId'))
        : res.status(200).json(httpResponse('success', course));
});



const updateCourse = asyncWrapper(async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseID, { $set: { ...req.body } });
    !course ? res.json(errHandle("error", 503, "can't find the course"))
        : res.status(200).json(httpResponse('Success', course));
});



const createCourse = asyncWrapper(async (req, res) => {
    const newCourse = await new Course({ ...req.body }).save();
    const course = await Course.find({ title: req.body.title });
    !course ? res.json(errHandle('Error', 401, 'invalid ObjectId'))
        : res.status(200).json(httpResponse('success', course));
});



const deleteCourse = asyncWrapper(async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.courseID);
    !course ? res.json(errHandle("error", 503, "can't find the course"))
        : res.status(200).json(httpResponse('Success', course));
});











module.exports = { getAllCourses, getCourse, updateCourse, createCourse, deleteCourse }











