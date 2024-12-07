const { json } = require("express");
const jwt = require('jsonwebtoken');
const {
    viewAttendanceModel,
    courseEnrollModel, getClassesModel, getCourseModel,
    getByStdName
} = require("../models/StudentModel")

async function getStudentAttendance(req, res) {
    try{

        const {student_id, class_id}= req.body;
        if(!student_id) return res.status(400).json({error: 'Incorrect Student ID'});

        const result = await viewAttendanceModel(class_id,student_id);
        res.json({data: result}); 
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Student Controller issue'});

    }
}

async function courseEnrollment(req,res) {
    try {
        const {enr_std_id, enr_class_id, enr_course_id} = req.body;
        if(!enr_std_id) return res.status(400).json({error: 'Incorrect Student ID'});
        if(!enr_class_id) return res.status(400).json({error: 'Incorrect Class ID'});
        if(!enr_course_id) return res.status(400).json({error: 'Incorrect Course ID'});

        const result = await courseEnrollModel(enr_std_id, enr_class_id, enr_course_id);
        res.json({date: result});

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Student controller issue'});
    }
}



async function getClasses(req, res) {
    try {
      const listclasses = await getClassesModel();
      res.json({ data: listclasses});

    }
    catch (err) {
      res.status(500).json({ message: "Error fetching Classes", error: err });}
  }


  async function getCourses(req, res) {
    try {
      const listcourses = await getCourseModel();
      res.json({data: listcourses});

    } catch(err) {
      res.status(500).json({message: "Error fetching Courses", error: err});
    }
  }




module.exports = {
    getStudentAttendance, courseEnrollment, getClasses, getCourses
}