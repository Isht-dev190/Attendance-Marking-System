const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");




router.post("/attendanceStudent", teacherController.getAttendance);
router.post("/markAttendance", teacherController.markAttendance);






module.exports = router;