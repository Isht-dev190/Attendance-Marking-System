// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const { fileURLToPath } = require('url');  // CommonJS way of importing
// const path = require('path');
// const adminRoutes = require('./routes/adminroute');

// // Get the current directory of the file using ES module syntax
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);  // Get the current directory

// dotenv.config();

// const schemaPath = path.resolve(dirname, 'schema.sql');

// if (!fs.existsSync(schemaPath)) {
//     console.error('Schema file not found at path:', schemaPath);
//     process.exit(1);
// }


// const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/", adminRoutes);

// // Database connection setup
// const db = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 100,
//     queueLimit: 0
// });

// // Function to execute SQL queries
// const executeQuery = (sql, params) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, params, (error, results) => {
//             if (error) reject(error);
//             else resolve(results);
//         });
//     });
// };

// // Initialize the database
// async function initializeDatabase() {
//     try {
//         await executeQuery(schemaSQL);  // Execute the schema SQL to create tables
//         console.log('Database tables created successfully!');
//     } catch (error) {
//         console.error('Error initializing database', error);
//         process.exit(1);
//     }
// }

// // Import routes (ensure it's the correct path)
// //import attendanceRoutes from './routes/attendance.js'; 

// // Use routes
// //app.use('/api/attendance', attendanceRoutes);

// // Start the server
// (async () => {
//     await initializeDatabase();
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//         console.log(`Server is running at port ${PORT}`);
//     });
// })();

// export default db;

// Use `require()` in CommonJS syntax
// server.js (or app.js)


const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoute');
const teacherRoute = require('./routes/teacherRoute')
const { db, testConnection } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', adminRoutes);
app.use('/', teacherRoute);

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