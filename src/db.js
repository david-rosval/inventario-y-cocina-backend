import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: HOST,
  user: USER,
  database: DATABASE,
});