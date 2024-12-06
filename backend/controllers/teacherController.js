const { json } = require("express");
const {
getAttendanceModel, markAttendanceModel
} = require("../models/teacherModel");

async function getAttendance(req, res) {
    try {

        const { student_id, class_id } = req.body;
        if(!student_id) return res.status(400).json({error: 'Incorrect Student ID'});

        const result = await getAttendanceModel(student_id, class_id);
        res.json({data: result});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error: 'Teacher Controller issue for getting Attendance'})

    }
    
}

async function markAttendance(req, res) {
    console.log("In teacher controller mark attendance")
    try{
        const {attendance_date, student_id, class_id, std_status} = req.body;
       // if(!attendance_id) return res.status(400).json({error: 'Incorrect Attendance ID'});
        if(!attendance_date) return res.status(400).json({error: 'Incorrect Attendance Date'});
        if(!student_id) return res.status(400).json({error: 'Incorrect Student ID'});
        if(!class_id) return res.status(400).json({error: 'Incorrect Class ID'});
        if(!std_status) return res.status(400).json({error: 'Incorrect Student Status'});


        const result = await markAttendanceModel(attendance_date, student_id, class_id, std_status);

        
        res.json({data: result});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error: 'Teacher controller issue for marking attendance'})

    }
}

module.exports = {
    getAttendance, markAttendance
}