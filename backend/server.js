const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoute');
const teacherRoute = require('./routes/teacherRoute');
const studentRoute = require('./routes/studentRoute')
const { db, testConnection } = require('./config/db');
// const authRoutes = require("./routes/authRoutes");
// const authMiddleware = require('./middleware/authMiddleware');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Our app route
// Dev Notes: Test Rotues
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoute);
app.use('/student', studentRoute);



async function startServer() {
  try {
    const isConnected = await testConnection();
    console.log("Connection to database successful")
    if (!isConnected) {
      console.error('Failed to connect to the database. Server will not start.');
      process.exit(1);
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();