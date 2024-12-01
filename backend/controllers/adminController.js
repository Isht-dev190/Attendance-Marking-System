const {
    listAdmins,
    createTeacherModel,createStudentModel, createCourseModel, createClassModel, 
    listClassesModel, listCourseModel, deleteClassModel, deleteCourseModel, deleteStudentModel,
    deleteTeacherModel

  } = require("../models/AdminModel");
  

async function getAdmins(req, res) {
    try {
      const listadmins= await listAdmins();
  
      res.json({ data: listadmins });
    } catch (err) {
      res.status(500).json({ message: "Error fetching Admins", error: err });
    }
  }
  


  async function getClasses(req, res) {
    try {
      const listclasses = await listClassesModel();
      res.json({ data: listclasses});

    }
    catch (err) {
      res.status(500).json({ message: "Error fetching Classes", error: err });}
  }

  async function getCourses(req, res) {
    try {
      const listcourses = await listCourseModel();
      res.json({data: listcourses});

    } catch(err) {
      res.status(500).json({message: "Error fetching Courses", error: err});
    }
  }


async function createTeacher(req, res) {
    try {

        const { teacher_name, teacher_email, teacher_department } = req.body;

        if(!teacher_name || !teacher_email || !teacher_department) {
            return res.status(400).json({error: 'All fields are required'});
        }

        const validDepartments = ['CS', 'Maths', 'Finance', 'Social Sciences'];
        if(!validDepartments.includes(teacher_department)) {
            return res.status(400).json({error: 'Invalid Department'})
        }

        const result = await createTeacherModel(teacher_name,teacher_email, teacher_department);

        res.json({data: result});

    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Admin controller issue for creating teacher'})

    }
}



async function createStudent(req, res) {
  try {
      const { std_name, std_email, std_program} = req.body;
      console.log(std_name, std_email, std_program)
      if(!std_name || !std_email || !std_program) {
          return res.status(400).json({error: 'All fields are required'});
      }
      const validPrograms= ['CS', 'BBA', 'ACF', 'ECO', 'ECOMATH', 'SS'];
      if(!validPrograms.includes(std_program)) {
          return res.status(400).json({error: 'Invalid Program'})
      }
      console.log(std_name, std_email, std_program)

      const result = await createStudentModel(std_name, std_email, std_program);
      res.json({data: result});
  }
  catch(error) {
      console.error(error);
      res.status(500).json({error: 'Admin controller issue for create student'})
  }
}


async function createCourse(req, res) {
  try {
    const {course_name, course_id} = req.body;
    console.log(course_id, course_name);
    if(!course_name || !course_id) {
      return res.status(400).json({error: "Course Id or Course Name is incorrect"})}

      const result = await createCourseModel(course_id, course_name);
      res.json({data: result})
    }
  
  catch(error) {
    console.error(error);
    res.status(500).json({error: 'Admin controller issue for course'})
  }

}


async function createClass(req,res) {
  try {
    const {class_id, class_start_time, class_end_time, course_id, teacher_id} = req.body;
    console.log(class_id, class_start_time, class_end_time, course_id, teacher_id);
    if(!class_id){
      return res.status(400).json({error: "Course Id is incorrect"})

    }
    else if(!class_start_time){
      return res.status(400).json({error: "Course start time is incorrect"})

    }
    else if(!class_end_time){
      return res.status(400).json({error: "Course end time is incorrect"})

    }
    else if(!course_id){
      return res.status(400).json({error: "Course id is incorrect"})

    }
    else if(!teacher_id){
      return res.status(400).json({error: "Teacher_id is incorrect"})
    }
    const result = await createClassModel(class_id, class_start_time, class_end_time, course_id, teacher_id);
      res.json({data: result})

  }
  catch(error) {
    console.error(error);
    res.status(500).json({error: 'Admin controller issue for create class'})
}
}


async function deleteClass(req, res) {
  try {
      const { class_id } = req.body;

      if (!class_id) {
          return res.status(400).json({ error: "Class ID is required." });
      }

      const result = await deleteClassModel(class_id);
      res.json({ message: `Class with ID ${class_id} deleted successfully`, data: result });
  } catch (error) {
      console.error("Error deleting class: ", error);
      res.status(500).json({ error: "Admin controller issue for deleting class" });
  }
}

async function deleteCourse(req, res) {
  try {
      const { course_id } = req.body;
      if (!course_id) {
          return res.status(400).json({ error: "Course ID is required." });
      }
      const result = await deleteCourseModel(course_id);

      // Return a success response
      res.json({ message: result.message });
  } catch (err) {
      console.error("Error deleting course:", err);
      res.status(500).json({ message: "Error deleting course", error: err.message });
  }
}

async function deleteStudent(req, res) {
  try {
      const { std_id } = req.body;

      if (!std_id) {
          return res.status(400).json({ error: "Student ID is required." });
      }
      const result = await deleteStudentModel(std_id);

      res.json({ message: result.message });
  } catch (err) {
      console.error("Error deleting student:", err);
      res.status(500).json({ message: "Error deleting student", error: err.message });
  }
}

async function deleteTeacher(req, res) {
  try {
      const { teacher_id } = req.body;

      if (!teacher_id) {
          return res.status(400).json({ error: "Teacher ID is required." });
      }

      const result = await deleteTeacherModel(teacher_id);

      res.json({ message: result.message });
  } catch (err) {
      console.error("Error deleting teacher:", err);
      res.status(500).json({ message: "Error deleting teacher", error: err.message });
  }
}

  module.exports = {
    getAdmins, createTeacher, createStudent, createCourse, createClass, getClasses, getCourses, 
    deleteClass, deleteCourse, deleteStudent, deleteTeacher

  }