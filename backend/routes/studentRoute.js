const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
// const {verifyToken} = require('../middleware/authMiddleware.js');
const authMiddlewareVerify = require("../middleware/authMiddleware")
// router.post("/login", studentController.login);
router.use(authMiddlewareVerify("Student"))
router.post("/viewStudentAttendance",studentController.getStudentAttendance);
router.post("/enroll", studentController.courseEnrollment);
router.get("/getCourses",  studentController.getCourses);
router.get("/getClasses", studentController.getClasses);

module.exports = router;
