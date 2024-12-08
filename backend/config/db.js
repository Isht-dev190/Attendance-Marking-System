
const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

console.log("in db.js")

console.log("Before create Pool function")
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'attendance_database',
  waitForConnections: true,
  connectionLimit: 100,
}).promise();  

console.log("After create pool function")

async function testConnection() {
  console.log("In test connection method");
  try {
      await db.query('SELECT 1');
      console.log('Database connection successful. ');
      
      return true;
  }
  catch(error) {
    console.error('Database connection failed: ', error.message);
    return false;
  }
}


module.exports = {
  db, 
  testConnection
};
