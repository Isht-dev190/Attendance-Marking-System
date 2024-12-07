'use client';
import { useState } from 'react';

const StudentPage = () => {
const [modalOpen, setModalOpen] = useState(false);
const [modalType, setModalType] = useState('');
const [formData, setFormData] = useState({
enr_std_id: '',
enr_class_id: '',
enr_course_id: '',
view_std_id: '',
view_class_id: ''
});
const [responseData, setResponseData] = useState(null); 
const [message, setMessage] = useState('');

const handleOpenModal = (type) => {
setModalType(type);
setModalOpen(true);
setFormData({ enr_std_id: '', enr_class_id: '', enr_course_id: '', view_std_id: '', view_class_id: '' });
setMessage('');
setResponseData(null);
};

const handleCloseModal = () => {
setModalOpen(false);
};

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleSubmit = async () => {
console.log('Submit button clicked');
try {
let url;
let method = 'POST';
let requestBody = {}; 
console.log('Form Data:', formData);
switch (modalType) {
case 'viewAttendance':
url = 'http://localhost:4000/student/viewStudentAttendance';
requestBody = {
class_id: formData.view_class_id,
student_id: formData.view_std_id,
};
break;
case 'enroll':
url = 'http://localhost:4000/student/enroll';
requestBody = {
enr_std_id: formData.enr_std_id,
enr_class_id: formData.enr_class_id,
enr_course_id: formData.enr_course_id,
};
break;
case 'getCourses':
url = 'http://localhost:4000/student/getCourses';
method = 'GET';
break;
case 'getClasses':
url = 'http://localhost:4000/student/getClasses';
method = 'GET';
break;
default:
return;
}

const options = {
method,
headers: {
'Content-Type': 'application/json',
},
};

if (method === 'POST') {
options.body = JSON.stringify(requestBody);
console.log('Request Body:', options.body); 
}

const response = await fetch(url, options);
if (!response.ok) {
const errorText = await response.text();
throw new Error(`Error: ${errorText}`);
}

const result = await response.json();
console.log('API Response:', result); 

if (response.ok) {
setResponseData(result); 
if (modalType === 'viewAttendance' && (!result.data || result.data.length === 0)) {
setMessage('No attendances available');
} else {
setMessage(`Action completed successfully!`);
}
} else {
setMessage(`Error: ${result.message || 'Something went wrong'}`);
}
} catch (error) {
console.log('Error caught:', error);
setMessage(`Error: ${error.message}`);
} finally {
setModalOpen(false);
}
};

return (
<div className="flex flex-col items-center justify-center h-screen">
<h1 className="text-3xl mb-6">STUDENT DASHBOARD</h1>
<div className="space-y-4">
<button onClick={() => handleOpenModal('viewAttendance')} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
 View Attendance
</button>
<button onClick={() => handleOpenModal('enroll')} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
 Enroll in Course
</button>
<button onClick={() => handleOpenModal('getCourses')} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
 Get Courses
</button>
<button onClick={() => handleOpenModal('getClasses')} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
 Get Classes
</button>
</div>
{modalOpen && (
<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
<div className="bg-white p-6 rounded-lg shadow-lg">
<h2 className="text-xl font-bold mb-4">
{modalType === 'enroll'
? 'Enroll in Course'
: modalType === 'viewAttendance'
? 'View Attendance'
: modalType === 'getCourses'
? 'Get Courses'
: 'Get Classes'}
</h2>
{/* Form Content */}
{modalType === 'viewAttendance' && (
<form>
<div className="mb-4">
<label className="block text-gray-700">Student ID:</label>
<input
type="text"
name="view_std_id"
value={formData.view_std_id}
onChange={handleChange}
className="w-full border border-gray-300 px-3 py-2 rounded-lg"
/>
</div>
<div className="mb-4">
<label className="block text-gray-700">Class ID:</label>
<input
type="text"
name="view_class_id"
value={formData.view_class_id}
onChange={handleChange}
className="w-full border border-gray-300 px-3 py-2 rounded-lg"
/>
</div>
</form>
 )}
{modalType === 'enroll' && (
<form>
<div className="mb-4">
<label className="block text-gray-700">Student ID:</label>
<input
type="text"
name="enr_std_id"
value={formData.enr_std_id}
onChange={handleChange}
className="w-full border border-gray-300 px-3 py-2 rounded-lg"
/>
</div>
<div className="mb-4">
<label className="block text-gray-700">Class ID:</label>
<input
type="text"
name="enr_class_id"
value={formData.enr_class_id}
onChange={handleChange}
className="w-full border border-gray-300 px-3 py-2 rounded-lg"
/>
</div>
<div className="mb-4">
<label className="block text-gray-700">Course ID:</label>
<input
type="text"
name="enr_course_id"
value={formData.enr_course_id}
onChange={handleChange}
className="w-full border border-gray-300 px-3 py-2 rounded-lg"
/>
</div>
</form>
 )}
<div className="flex justify-end space-x-2">
<button
type="button"
onClick={handleCloseModal}
className="bg-gray-500 text-white px-4 py-2 rounded-lg"
>
 Cancel
</button>
<button
type="button"
onClick={handleSubmit}
className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
>
 Submit
</button>
</div>
</div>
</div>
 )}


{responseData && modalType === 'getClasses' && (
<div className="mt-6">
<h2 className="text-2xl font-bold">List of Classes:</h2>
{Array.isArray(responseData.data) && responseData.data.length > 0 ? (
<table className="min-w-full border-collapse border border-gray-300">
<thead>
<tr>
<th className="border px-4 py-2">Class ID</th>
<th className="border px-4 py-2">Class Start Time</th>
<th className="border px-4 py-2">Class End Time</th>
<th className="border px-4 py-2">Course ID</th>
<th className="border px-4 py-2">Teacher ID</th>
</tr>
</thead>
<tbody>
{responseData.data.map((item, index) => (
<tr key={index}>
<td className="border px-4 py-2">{item.class_id}</td>
<td className="border px-4 py-2">{item.class_start_time}</td>
<td className="border px-4 py-2">{item.class_end_time}</td>
<td className="border px-4 py-2">{item.course_id}</td>
<td className="border px-4 py-2">{item.teacher_id}</td>
</tr>
 ))}
</tbody>
</table>
 ) : (
<p>No classes available</p>
 )}
</div>
 )}
{responseData && modalType === 'getCourses' && (
<div className="mt-6">
<h2 className="text-2xl font-bold">List of Courses:</h2>
{Array.isArray(responseData.data) && responseData.data.length > 0 ? (
<table className="min-w-full border-collapse border border-gray-300">
<thead>
<tr>
<th className="border px-4 py-2">Course ID</th>
<th className="border px-4 py-2">Course Name</th>
<th className="border px-4 py-2">Credits</th>
</tr>
</thead>
<tbody>
{responseData.data.map((item, index) => (
<tr key={index}>
<td className="border px-4 py-2">{item.course_id}</td>
<td className="border px-4 py-2">{item.course_name}</td>
<td className="border px-4 py-2">{item.credits}</td>
</tr>
 ))}
</tbody>
</table>
 ) : (
<p>No courses available</p>
 )}
</div>
 )}
{responseData && modalType === 'viewAttendance' && (
<div className="mt-6">
<h2 className="text-2xl font-bold">Attendance Records:</h2>
{Array.isArray(responseData.data) && responseData.data.length > 0 ? (
<table className="min-w-full border-collapse border border-gray-300">
<thead>
<tr>
<th className="border px-4 py-2">Date</th>
<th className="border px-4 py-2">Status</th>
</tr>
</thead>
<tbody>
{responseData.data.map((item, index) => (
<tr key={index}>
<td className="border px-4 py-2">{item.attendance_date}</td>
<td className="border px-4 py-2">{item.status}</td>
</tr>
 ))}
</tbody>
</table>
 ) : (
<p>No attendance records available</p>
 )}
</div>
)}
{message && <div className="mt-6 text-center">{message}</div>}
</div>
 );
};

export default StudentPage;