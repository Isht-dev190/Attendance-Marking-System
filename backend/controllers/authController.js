const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {findStudentbyEmail} = require("../models/StudentModel");
const {findAdminByEmail} = require("../models/AdminModel");
const {findTeacherbyEmail} = require("../models/TeacherModel");


async function signinStudent(req,res) {
    const {email, password} = req.body;
    try {
        const student =  await findStudentbyEmail(email);
        if (!student) return res.status(400).json({ error: "Student not found" });
        console.log(student);
        const isMatch = await bcrypt.compare(password, student[1]);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user[0] }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ token });
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
}


async function signinAdmin(req,res) {
    const {email, password} = req.body;
    try {
        const admin =  await findAdminByEmail(email);
        if (!admin) return res.status(400).json({ error: "Student not found" });
        console.log(admin);
        const isMatch = await bcrypt.compare(password, admin[1]);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user[0] }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ token });
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
}

async function signinTeacher(req,res) {
    const {email, password} = req.body;
    try {
        const teacher =  await findTeacherbyEmail(email);
        if (!teacher) return res.status(400).json({ error: "Student not found" });
        console.log(teacher);
        const isMatch = await bcrypt.compare(password, teacher[1]);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user[0] }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ token });
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
}



module.exports = {signinStudent,signinAdmin, signinTeacher};
