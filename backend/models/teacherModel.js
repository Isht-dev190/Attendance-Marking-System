const { db } = require('../config/db');

async function getAttendanceModel(student_id) {
    try {
        console.log("In get Attendance Model");
        const query = `CALL VIEWATTENDNCE(?)`; 
        const [rows] = await db.execute(query, [student_id]);
        return rows;
    } catch (error) {
        console.error(`Error getting attendance for student_id: ${student_id}`, error);
        throw error;
    }
}

async function markAttendanceModel(attendance_date, student_id, class_id, std_status) {
    try {
        console.log("In Attendance Model");
        const query = `CALL MARKATTENDANCE (?,?,?,?)`;
        const [rows] = await db.execute(query, [attendance_date, student_id, class_id, std_status]);
        return {
            attendance_date,
            student_id,
            class_id,
            std_status,
        };
    } catch (error) {
        console.error(`Error marking attendance for student_id: ${student_id}`, error);
        throw error;
    }
}

async function findTeacherByEmail(email) {
    try{
        // double check query
        console.log("In find teacher function");
        const query = `SELECT * FROM TEACHER WHERE teacher_email = :email`;
        const result = await db.execute(query, [email]);
        return result.rows[0];
      } catch(err) {
        console.log(err);
        throw err;
      }
}

module.exports = {
    getAttendanceModel,
    markAttendanceModel, findTeacherByEmail
};
