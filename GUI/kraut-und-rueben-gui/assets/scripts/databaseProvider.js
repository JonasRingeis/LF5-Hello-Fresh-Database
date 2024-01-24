import mysql from 'mysql2/promise';

// Create a connection to the database
const connection = mysql.createPool({
    host: '127.0.0.1:3306',
    user: 'root',
    password: '!-/#vWj,]{HNM9cZEq+/',
    database: 'krautundrueben'
});

// Export the connection
export default connection;