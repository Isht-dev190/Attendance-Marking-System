'use client';
import { useState } from "react";
import Modal from "../modal";

const AdminPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");

  const handleAdminAction = (action) => {
    switch (action) {
      case "createStudent":
        setModalTitle("Create Student");
        setModalFields([
          { label: "Name", name: "std_name", type: "text", placeholder: "Add student name" },
          { label: "Email", name: "std_email", type: "email", placeholder: "Add student email" },
          { label: "Program", name: "std_program", type: "select", options: ["CS", "BBA", "ACF", "ECO", "ECOMATH", "SS"] },
        ]);
        setApiEndpoint("http://localhost:4000/admin/createStudent");
        break;
      case "createTeacher":
        setModalTitle("Create Teacher");
        setModalFields([
          { label: "Name", name: "teacher_name", type: "text", placeholder: "Add teacher name" },
          { label: "Email", name: "teacher_email", type: "email", placeholder: "Add teacher email" },
          { label: "Department", name: "teacher_department", type: "select", options: ["CS", "Maths", "Finance", "Social Sciences"] },
        ]);
        setApiEndpoint("http://localhost:4000/admin/createTeacher");
        break;
      case "createCourse":
        setModalTitle("Create Course");
        setModalFields([
          {label: "Course Id", name: "course_id", type: "text", placeholder:"Add course Id"},
          { label: "Course Name", name: "course_name", type: "text", placeholder: "Add course name" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/createCourse");
        break;
      case "createClass":
        setModalTitle("Create Class");
        setModalFields([
          {label: "Class ID", name: "class_id", type:"number"},
          { label: "Start Time", name: "class_start_time", type: "time" },
          { label: "End Time", name: "class_end_time", type: "time" },
          { label: "Course ID", name: "course_id", type: "number", placeholder: "Add course ID" },
          { label: "Teacher ID", name: "teacher_id", type: "number", placeholder: "Add teacher ID" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/createClass");
        break;
      case "deleteClass":
        setModalTitle("Delete Class");
        setModalFields([
          { label: "Class ID", name: "class_id", type: "number", placeholder: "Add class ID" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/deleteClass");
        break;
      case "deleteCourse":
        setModalTitle("Delete Course");
        setModalFields([
          { label: "Course ID", name: "course_id", type: "number", placeholder: "Add course ID" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/deleteCourse");
        break;
      case "deleteStudent":
        setModalTitle("Delete Student");
        setModalFields([
          { label: "Student ID", name: "std_id", type: "number", placeholder: "Add student ID" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/deleteStudent");
        break;
      case "deleteTeacher":
        setModalTitle("Delete Teacher");
        setModalFields([
          { label: "Teacher ID", name: "teacher_id", type: "number", placeholder: "Add teacher ID" },
        ]);
        setApiEndpoint("http://localhost:4000/admin/deleteTeacher");
        break;
      default:
        break;
    }
    setModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
      alert("Action completed successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="text-3xl mb-6 ">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          onClick={() => handleAdminAction("createStudent")}
          className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-110"
        >
          Create Student
        </button>


        <button
          onClick={() => handleAdminAction("createTeacher")}
          className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-110"
        >
          Create Teacher
        </button>
        <button
          onClick={() => handleAdminAction("createCourse")}
          className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-110"
        >
          Create Course
        </button>
        <button
          onClick={() => handleAdminAction("createClass")}
          className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-110"
        >
          Create Class
        </button>
        <button
          onClick={() => handleAdminAction("deleteClass")}
          className="bg-red-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-red-500 hover:font-bold hover:scale-110"
        >
          Delete Class
        </button>
        <button
          onClick={() => handleAdminAction("deleteCourse")}
          className="bg-red-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-red-500 hover:font-bold hover:scale-110"
        >
          Delete Course
        </button>
        <button
          onClick={() => handleAdminAction("deleteStudent")}
          className="bg-red-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-red-500 hover:font-bold hover:scale-110"
        >
          Delete Student
        </button>
        <button
          onClick={() => handleAdminAction("deleteTeacher")}
          className="bg-red-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-white hover:text-red-500 hover:font-bold hover:scale-110"
        >
          Delete Teacher
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        fields={modalFields}
        title={modalTitle}
      />
    </div>
  );
};

export default AdminPage;
