const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/createStudent", adminController.createStudent);
router.post("/createTeacher", adminController.createTeacher);
router.post("/createCourse", adminController.createCourse);
router.post("/createClass", adminController.createClass);
router.get("/Courses", adminController.getCourses);
router.get("/Classes", adminController.getClasses);
router.post("/deleteClass", adminController.deleteClass);
router.post("/deleteCourse", adminController.deleteCourse);
router.post("/deleteStudent", adminController.deleteStudent);
router.post("/deleteTeacher", adminController.deleteTeacher);






module.exports = router;    