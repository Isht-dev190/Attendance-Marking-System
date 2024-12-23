const { db } = require('../config/db');

async function viewAttendanceModel(student_id, class_id) {
    try {
        console.log("In Attendance Model");
        const query = `CALL VIEWATTENDANCE (?,?)`; 
        const [rows] = await db.execute(query, [student_id, class_id]);
        return rows;
    } catch (error) {
        console.error(`Error getting student attendance with id: ${student_id}`, error);
        throw error;
    }
}

async function courseEnrollModel(enr_std_id, enr_class_id, enr_course_id) {
    try {
        console.log("In course Enrollment Model");
        const query = `CALL ENROLLSTUDENT(?,?,?)`; 
        const [rows] = await db.execute(query, [enr_std_id, enr_class_id, enr_course_id]);
        return {
            enr_std_id,
            enr_class_id,
            enr_course_id,
        };
    } catch (error) {
        console.error("Error enrolling in course:", error);
        throw error;
    }
}


async function getClassesModel() {
    try{
      console.log("In get classes function");
      const [rows] = await db.query('SELECT * FROM CLASS')
      console.log(rows);
      return rows;
    }
    catch(error) {
      console.error(error);
      throw error;
    }
  }

  async function getCourseModel() {
    try {
      console.log("In list courses model");
      const [rows] = await db.query('SELECT * FROM COURSE')
      console.log(rows);
      return rows;
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
  
module.exports = {
    viewAttendanceModel,
    courseEnrollModel,
    getClassesModel, getCourseModel
};
