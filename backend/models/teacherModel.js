const {db} = require('../config/db'); 

async function getAttendanceModel(student_id) {
    try {
        console.log("In get Attendance Model")
        const query= 'SELECT * FROM ATTENDANCE WHERE student_id= ?';
        const [rows] = await db.execute(query, [student_id]);
        return rows;


   
    } catch (error) {
        console.error('Error getting attendance for student_id: ${student_id} ', error);
        throw error;
    }
}

async function markAttendanceModel(attendance_id, attendance_date, student_id, class_id, std_status) {
    try {
        console.log("In Attendance Model")
        const query = 'INSERT INTO ATTENDANCE(attendance_id, attendance_date, student_id, class_id, std_status) VALUES (?,?,?,?,?)'
        const [rows] = await db.execute(query, [attendance_id, attendance_date, student_id, class_id, std_status]);
    
        return {
        attendance_id: attendance_id,
        attendance_date: attendance_date,
        student_id: student_id,
        class_id: class_id,
        std_status: std_status
    };
    
    }   catch(error) {
    console.error('Error marking attendance for student id: ${student_id} and attendance date: ${attendance_date}')
    }
}


module.exports = {
    getAttendanceModel, markAttendanceModel
}