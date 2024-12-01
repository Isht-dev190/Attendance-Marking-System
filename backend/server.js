const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoute');
const teacherRoute = require('./routes/teacherRoute');
const studentRoute = require('./routes/studentRoute')
const { db, testConnection } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', adminRoutes);
app.use('/', teacherRoute);
app.use('/', studentRoute);



async function startServer() {
  try {
    const isConnected = await testConnection();
    console.log("Connection to database successful")
    if (!isConnected) {
      console.error('Failed to connect to the database. Server will not start.');
      process.exit(1);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();