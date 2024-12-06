-- THIS FILE CONTAINS ALL THE TABLES THAT THE DATABASE SCHEMA HAS.
CREATE TABLE IF NOT EXISTS TEACHER (
 teacher_id INT AUTO_INCREMENT PRIMARY KEY,
 teacher_name VARCHAR(255),
 teacher_email VARCHAR(255),
 teacher_department ENUM('CS', 'Maths', 'Finance', 'Social Sciences')  NOT NULL);

CREATE TABLE IF NOT EXISTS ADMIN (
 admin_username VARCHAR(30) PRIMARY KEY,
 admin_email VARCHAR(255) NOT NULL,
 admin_position VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS COURSE (
 course_id INT PRIMARY KEY,
 course_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS STUDENTS (
 std_id INT AUTO_INCREMENT PRIMARY KEY,
 std_name VARCHAR(255) NOT NULL,
 std_email VARCHAR(255) UNIQUE NOT NULL,
 std_program ENUM('CS', 'BBA', 'ACF', 'ECO', 'ECOMATH', 'SS') NOT NULL

);

CREATE TABLE IF NOT EXISTS CLASS (
 class_id INT PRIMARY KEY,
 class_start_time TIME,
 class_end_time TIME,
 course_id INT,
 teacher_id INT,
 FOREIGN KEY(course_id) REFERENCES COURSE(course_id) ON DELETE SET NULL,
 FOREIGN KEY(teacher_id) REFERENCES TEACHER(teacher_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS ATTENDANCE (
 attendance_date DATE PRIMARY KEY,
 student_id INT,
 class_id INT,
 std_status ENUM('Present', 'Absent'),
 FOREIGN KEY(student_id) REFERENCES STUDENTS(std_id) ON DELETE CASCADE,
 FOREIGN KEY(class_id) REFERENCES CLASS(class_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS ENROLLMENT(
    enr_std_id INT,
    enr_class_id INT,
    enr_course_id INT,
    PRIMARY KEY (enr_std_id, enr_class_id),
    FOREIGN KEY(enr_std_id) REFERENCES STUDENTS(std_id) ON DELETE CASCADE,
    FOREIGN KEY(enr_class_id) REFERENCES CLASS(class_id) ON DELETE CASCADE,
    FOREIGN KEY(enr_course_id) REFERENCES COURSE(course_id) ON DELETE CASCADE
);


DELIMITER //
CREATE PROCEDURE ENROLLSTUDENT(
    IN p_enr_std_id INT,
    IN p_enr_class_id INT,
    IN p_enr_course_id INT
)
BEGIN
   
    IF EXISTS (SELECT 1 FROM STUDENTS WHERE std_id = p_enr_std_id) AND
       EXISTS (SELECT 1 FROM CLASS WHERE class_id = p_enr_class_id) AND
       EXISTS (SELECT 1 FROM COURSE WHERE course_id = p_enr_course_id) THEN
        INSERT INTO ENROLLMENT (enr_std_id, enr_class_id, enr_course_id)
        VALUES (p_enr_std_id, p_enr_class_id, p_enr_course_id);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid student, class, or course ID.';
    END IF;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE MARKATTENDANCE(
    IN p_attendance_date DATE,
    IN p_student_id INT,
    IN p_class_id INT,
    IN p_std_status ENUM('Present', 'Absent')
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM STUDENTS WHERE std_id = p_student_id) AND
       EXISTS (SELECT 1 FROM CLASS WHERE class_id = p_class_id) THEN
        INSERT INTO ATTENDANCE (attendance_date, student_id, class_id, std_status)
        VALUES (p_attendance_date, p_student_id, p_class_id, p_std_status);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid student or class ID.';
    END IF;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE VIEWATTENDANCE(
    IN p_student_id INT,
    IN p_class_id INT
)
BEGIN
    SELECT attendance_date, student_id, class_id, std_status
    FROM ATTENDANCE
    WHERE student_id = p_student_id
    AND class_id = p_class_id;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER prevent_duplicate_enrollment
BEFORE INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
IF EXISTS (
SELECT 1 FROM ENROLLMENT
WHERE enr_std_id = NEW.enr_std_id
AND enr_class_id = NEW.enr_class_id
) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Student is already enrolled in this class.';
END IF;
END //
DELIMITER ;



