import mysql from 'mysql2/promise'
import { DB_DATABASE, DB_HOST, DB_MYSQL_PORT, DB_PASSWORD, DB_USER } from './config.js'

export const connection = await mysql.createConnection({
  host: DB_HOST,
  port: DB_MYSQL_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
})

export const connectDB = async () => {
  try {
    await connection.connect()
    console.log('<<< Database connected >>>')
  } catch (error) {
    console.log('Error connecting to database:', error)
  } finally {
    await connection.end()
  }
}
