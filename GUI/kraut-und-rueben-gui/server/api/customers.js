import { defineEventHandler } from 'h3'
import mysql from 'mysql2/promise'

// Create a MySQL connection
async function createConnection() {
  return mysql.createConnection({
    host: '127.0.0.1:3306',
    user: 'root',
    password: '!-/#vWj,]{HNM9cZEq+/',
    database: 'krautundrueben'
  });
}
  
export default defineEventHandler(async (event) => {
  let connection;
  try {
    connection = await createConnection();
    const [rows] = await connection.query('SELECT * FROM kunde');
    return rows;
  } catch (error) {
    // Handle error
    console.error(error);
    event.node.res.statusCode = 500;
    return { error: 'Error fetching customers, ' + error };
  }
})