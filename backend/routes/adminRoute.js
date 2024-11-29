const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.get("/Adminlist", adminController.getAdmins);
router.post("/createStudent", adminController.createStudent);
router.post("/createTeacher", adminController.createTeacher);
router.post("/createCourse", adminController.createCourse);
router.post("/createClass", adminController.createClass);
router.get("/Courses", adminController.getCourses);
router.get("/Classes", adminController.getClasses);






module.exports = router;    