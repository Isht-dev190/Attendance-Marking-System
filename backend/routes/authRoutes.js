const express = require("express");
const {signinStudent, signinAdmin, signinTeacher} = require("../controllers/authController");

const router = express.Router();

router.post("/signinAdmin", signinAdmin);
router.post("/signinTeacher", signinTeacher);
router.post("/signinStudent", signinStudent);

module.exports = router;
