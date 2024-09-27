import mysql from 'mysql2/promise';
import { DATABASE, HOST, MYSQL_PORT, PASSWORD, USER } from './config.js';

export const connection = await mysql.createConnection({
  host: HOST,
  port: MYSQL_PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

export const connectDB = async () => {
  try {
    await connection.connect();
    console.log('<<< Database connected >>>');
  } catch (error) {
    console.log('Error connecting to database:', error);
  }
}