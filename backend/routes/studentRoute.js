    const express = require("express");
    const router = express.Router();
    const studentController = require("../controllers/studentController");
    



    router.post("/viewStudentAttendance",studentController.getStudentAttendance);
    router.post("/enroll", studentController.courseEnrollment);
    router.get("/getCourses",  studentController.getCourses);
    router.get("/getClasses", studentController.getClasses);



    
    module.exports = router;
