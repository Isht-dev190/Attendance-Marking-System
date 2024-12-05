import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding }) => {
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('CS');
  const [programs, setPrograms] = useState(['CS', 'BBA', 'ACF', 'ECO', 'ECOMATH', 'SS']);  // Possible programs for student

  // Get the next available student ID from the backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/studentidmax/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setID(data.data[0][0] + 1);
      })
      .catch((error) => console.error("Error fetching Student ID", error));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !program) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newStudent = {
      id,
      name,
      email,
      password,
      program,
    };

    try {
      const response = await fetch('http://localhost:3001/api/students', {  // API endpoint for adding student
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${name} has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error('Failed to add student');
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'Please try again',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsAdding(false);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Student</h1>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="program">Program</label>
        <select
          id="program"
          name="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          {programs.map((programOption) => (
            <option key={programOption} value={programOption}>
              {programOption}
            </option>
          ))}
        </select>

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
