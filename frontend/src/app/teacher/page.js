'use client';
import { useState } from "react";
import Modal from "../modal"; 
import { useRouter } from "next/navigation";

const TeacherPage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [attendanceData, setAttendanceData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleTeacherAction = (action) => {
    setError(""); 
    setAttendanceData(null); 
    switch (action) {
      case "markAttendance":
        setModalTitle("Mark Attendance");
        setModalFields([
          { label: "Date", name: "attendance_date", type: "date" },
          { label: "Student ID", name: "student_id", type: "number", placeholder: "Enter student ID" },
          { label: "Class ID", name: "class_id", type: "number", placeholder: "Enter class ID" },
          { label: "Status", name: "std_status", type: "select", options: ["Present", "Absent"] },
        ]);
        setApiEndpoint("http://localhost:4000/teacher/markAttendance");
        break;
      case "attendanceStudent":
        setModalTitle("View Student Attendance");
        setModalFields([
          { label: "Student ID", name: "student_id", type: "number", placeholder: "Enter student ID" },
          { label: "Class ID", name: "class_id", type: "number", placeholder: "Enter class ID" },
        ]);
        setApiEndpoint("http://localhost:4000/teacher/attendanceStudent");
        break;
      default:
        break;
    }
    setModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    setLoading(true); 
    try {
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

      const result = await response.json();

      if (apiEndpoint === "http://localhost:4000/teacher/attendanceStudent") {
        setAttendanceData(result.data[0]); 
        alert("Action completed successfully!"); 
      }
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-6">TEACHER DASHBOARD</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
        <button
          onClick={() => handleTeacherAction("markAttendance")}
          className="bg-green-500 text-white text-xl px-8 py-5 rounded-lg transform transition-all hover:bg-white hover:text-green-500 hover:scale-110"
        >
          Mark Attendance
        </button>
        <button
          onClick={() => handleTeacherAction("attendanceStudent")}
          className="bg-green-500 text-white text-xl px-8 py-5 rounded-lg transform transition-all hover:bg-white hover:text-green-500 hover:scale-110"
        >
          View Student Attendance
        </button>
      </div>
      
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-blue-500">Loading...</div>}
      
     
      {attendanceData && attendanceData.length > 0 && !loading && (
        <div className="attendance-results mt-6">
          <h2 className="text-2xl">Attendance Records</h2>
          <table className="table-auto border-collapse w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Student ID</th>
                <th className="border px-4 py-2">Class ID</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{attendance.attendance_date}</td>
                  <td className="border px-4 py-2">{attendance.student_id}</td>
                  <td className="border px-4 py-2">{attendance.class_id}</td>
                  <td className="border px-4 py-2">{attendance.std_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default TeacherPage;



