// Import the db pool from server.js
const {db} = require('../config/db'); 


//console.log(db);
async function listAdmins() {
  try {
    console.log("In list admins function")
    
    const [rows] = await db.query('SELECT * FROM ADMIN;');
    
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

// async function createstudent(studentData) {
//   try {
//     const [result] = await 
//             db.query(`INSERT INTO STUDENTS (
//                     std_name, 
//                     std_email, 
//                     std_program
//                 ) VALUES (?, ?, ?)
//             `, [
//                 studentData.name, 
//                 studentData.email, 
//                 studentData.program
//             ]);

//             await db.commit();
//             return result.insertId;
//         }
//         catch (error) {
//             await connection.rollback();
//             throw error;
//         }
//   }


// async function createTeacherModel(teacher_name, teacher_email, teacher_department) {
//   try {
  
//   console.log("in teacher model ")
//     return new Promise((resolve, reject) => {
//       console.log("In promise")
//       const [rows] = `INSERT INTO TEACHER (teacher_name, teacher_email, teacher_department) VALUES (?,?,?)`
//       console.log("Teacher inserted with teacher name: ", teacher_name)
//       console.log("Teacher inserted with teacher name: ", teacher_email)
//       console.log("Teacher inserted with teacher name: ", teacher_department)
//       return {
//         teacher_name: teacher_name,
//         teacher_email: teacher_email,
//         teacher_department: teacher_department
//     };
    

//   });
// } catch(err) {
//   console.log("Error inserting teacher: ", err);
//   throw err;
// }
//   }

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




module.exports = { listAdmins, createTeacherModel, createStudentModel, createCourseModel , createClassModel, listClassesModel, listCourseModel};
