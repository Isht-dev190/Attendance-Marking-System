// Import the db pool from server.js
const {db} = require('../config/db'); 


// //console.log(db);
// async function listAdmins() {
//   try {
//     console.log("In list admins function")
    
//     const [rows] = await db.query('SELECT * FROM ADMIN;');
    
//     console.log(rows);
//     return rows;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function listClassesModel() {
  try{
    console.log("In list classes function");
    const [rows] = await db.query('SELECT * FROM CLASS')
    console.log(rows);
    return rows;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

async function listCourseModel() {
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


  async function createTeacherModel(teacher_name, teacher_email, teacher_department) {
    try {
        console.log("In teacher model");

        const query = `INSERT INTO TEACHER (teacher_name, teacher_email, teacher_department) VALUES (?, ?, ?)`;

        const [result] = await db.execute(query, [teacher_name, teacher_email, teacher_department]);

        console.log("Teacher inserted with ID:", result.insertId);
        console.log("Teacher Name:", teacher_name);
        console.log("Teacher Email:", teacher_email);
        console.log("Teacher Department:", teacher_department);

        return {
            teacher_name: teacher_name,
            teacher_email: teacher_email,
            teacher_department: teacher_department
        };

    } catch (err) {
          console.error("Error inserting teacher:", err);
          throw err; 
    }
}


async function createStudentModel(std_name, std_email, std_program) {
  try {
      console.log("In create  student model")
      const query = `INSERT INTO STUDENTS (std_name, std_email, std_program) VALUES (?, ?, ?)`;

      const [result] = await db.execute(query, [std_name, std_email, std_program]);

      console.log("Student inserted with ID:", result.insertId);
      console.log("Student Name:", std_name);
      console.log("Student Email:", std_email);
      console.log("Student Program:", std_program);

      return {
          std_name: std_name,
          std_email: std_email,
          std_program: std_program
      };
  } catch(err) {
      console.error("Error inserting student:", err);
      throw err; 
  }
}

async function createCourseModel(course_id, course_name) {
  try {
    console.log("In create course model")
    const query = `INSERT INTO COURSE (course_id, course_name) VALUES (?,?)`
  const [result] = await db.execute(query, [course_id, course_name]);
  console.log("Course inserted with id: ", course_id);
  console.log("Course inserted with name: ", course_name);
  return {
    course_id: course_id,
    course_name: course_name
  }
  }
  catch(err) {
    console.error("Error creating course: ", err);
    throw err;
  }
}

async function createClassModel(class_id, class_start_time, class_end_time, course_id, teacher_id) {
try {
  console.log("In create Class model");
  const query = `INSERT INTO CLASS(class_id, class_start_time, class_end_time, course_id, teacher_id) VALUES (?,?,?,?,?)`
  const [result] = await db.execute(query, [class_id,class_start_time, class_end_time, course_id, teacher_id])
  console.log("Class inserted with values: ", class_id,class_start_time,class_end_time,course_id,teacher_id);
  return {
    class_id: class_id,
    class_start_time: class_start_time,
    class_end_time: class_end_time,
    course_id: course_id,
    teacher_id: teacher_id
  }

}
catch(err) {
  console.error("Error creating class: ", err)
  throw err;
}
}

async function deleteClassModel(class_id) {
  try {
      console.log("In delete Class model");

      const query = `DELETE FROM CLASS WHERE class_id = ?`;
      const [result] = await db.execute(query, [class_id]);

      if (result.affectedRows === 0) {
          throw new Error(`Class with ID ${class_id} does not exist.`);
      }

      console.log(`Class with ID ${class_id} deleted successfully.`);
      return { message: `Class with ID ${class_id} deleted successfully.` };
  } catch (err) {
      console.error("Error deleting class: ", err);
      throw err;
  }
}

async function deleteCourseModel(course_id) {
  try {
      console.log("In deleteCourseModel");
      const query = `DELETE FROM COURSE WHERE course_id = ?`;
      const [result] = await db.execute(query, [course_id]);
      
      if (result.affectedRows === 0) {
          throw new Error(`No course found with id ${course_id}`);
      }

      console.log(`Course with ID ${course_id} deleted successfully.`);
      return { message: `Course with ID ${course_id} deleted successfully.` };
  } catch (err) {
      console.error("Error deleting course: ", err);
      throw err;
  }
}


async function deleteStudentModel(std_id) {
  try {
    console.log("In Delete Student Model");
      const query = `DELETE FROM STUDENTS WHERE std_id = ?`;
      const [result] = await db.execute(query, [std_id]);

      if (result.affectedRows === 0) {
          throw new Error(`No student found with id ${std_id}`);
      }

      return { message: `Student with ID ${std_id} deleted successfully.` };
  } catch (err) {
      console.error("Error deleting student:", err);
      throw err; 
  }
}

async function deleteTeacherModel(teacher_id) {
  try {
      const query = `DELETE FROM TEACHER WHERE teacher_id = ?`;
      const [result] = await db.execute(query, [teacher_id]);

      if (result.affectedRows === 0) {
          throw new Error(`No teacher found with ID ${teacher_id}`);
      }

      return { message: `Teacher with ID ${teacher_id} deleted successfully.` };
  } catch (err) {
      console.error("Error deleting teacher:", err);
      throw err; 
  }
}


async function findAdminByEmail(email) {
  try{
    // double check query
    console.log("In find admin function");
    const query = `SELECT * FROM ADMIN WHERE admin_email = :email`;
    const result = await db.execute(query, [email]);
    return result.rows[0];
  } catch(err) {
    console.log(err);
    throw err;
  }
}


module.exports = { createTeacherModel, createStudentModel, 
  createCourseModel , createClassModel, listClassesModel, listCourseModel, 
  deleteClassModel, deleteCourseModel, deleteStudentModel, deleteTeacherModel,
  findAdminByEmail
};
