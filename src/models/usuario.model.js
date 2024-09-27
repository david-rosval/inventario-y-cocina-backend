import { connection } from "../db.js";

export class UsuarioModel {
  static async getAll() {
    const [usuarios] = await connection.query(`
        SELECT * FROM Usuarios;
      `)
    return usuarios
  }

  static async authenticate({ email, pw }) {
    // Verifica si el usuario con el email existe
    const [pwQuery] = await connection.query(`
        SELECT password FROM Usuarios WHERE email = ?;
      `, [email])
    if (pwQuery.length === 0) throw new Error('No existe usuario con ese email')
    // verifica si la contraseña concuerda
    const [{ password }] = pwQuery
    if (password !== pw) return false
    return true
  }

  static async register({ input }) {
    const { nombre, apellido, email, password, rol } = input
    try {
      await connection.query(`
        INSERT INTO Usuarios (nombre, apellido, email, password, rol)
        VALUES (?, ?, ?, ?, ?);
      `, [nombre, apellido, email, password, rol])
    } catch (error) {
      throw new Error('Error al registrar usuario')
    }
  }
}