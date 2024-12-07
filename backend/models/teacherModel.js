const { db } = require('../config/db');

async function getAttendanceModel(student_id,class_id) {
    try {
        console.log("In get Attendance Model");
        const query = `CALL VIEWATTENDANCE(?,?)`; 
        const [rows] = await db.execute(query, [student_id, class_id]);
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

module.exports = {
    getAttendanceModel,
    markAttendanceModel
};
