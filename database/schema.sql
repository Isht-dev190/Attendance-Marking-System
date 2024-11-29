-- THIS FILE CONTAINS ALL THE TABLES THAT THE DATABASE SCHEMA HAS.
CREATE TABLE IF NOT EXISTS TEACHER (
    teacher_id INT PRIMARY KEY,
    teacher_name VARCHAR(255),
    teacher_email VARCHAR(255),
    teacher_department ENUM('CS', 'Maths', 'Finance', 'Social Sciences')
);


CREATE TABLE IF NOT EXISTS COURSE (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS CLASS (
    class_id INT PRIMARY KEY,
    class_start_time TIME,
    class_end_time TIME,
    course_id INT,
    teacher_id INT,
    FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
    FOREIGN KEY(teacher_id) REFERENCES TEACHER(teacher_id)
);


CREATE TABLE IF NOT EXISTS STUDENTS (
    std_id INT AUTO_INCREMENT PRIMARY KEY,
    std_name VARCHAR(255) NOT NULL,
    std_email VARCHAR(255) UNIQUE NOT NULL,
    std_program ENUM('CS', 'BBA', 'ACF', 'ECO', 'ECOMATH', 'SS') NOT NULL,
    class_id INT,
    FOREIGN KEY(class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS ATTENDANCE (
    attendance_id INT PRIMARY KEY,
    attendance_date DATE,
    student_id INT,
    class_id INT,
    FOREIGN KEY(student_id) REFERENCES STUDENTS(std_id),
    FOREIGN KEY(class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS ADMIN (
    admin_username VARCHAR(30),
    admin_password VARCHAR(30),
    admin_position VARCHAR(30)
);
