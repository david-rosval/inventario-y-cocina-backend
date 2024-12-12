import mysql from 'mysql2/promise'
import { DB_DATABASE, DB_HOST, DB_MYSQL_PORT, DB_PASSWORD, DB_USER } from './config.js'

export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_MYSQL_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  connectTimeout: 20000
})
