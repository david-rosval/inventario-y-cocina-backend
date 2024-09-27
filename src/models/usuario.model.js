import { connection } from "../db.js";

export class UsuarioModel {
  static async getAll() {
    const [usuarios] = await connection.query(`
        SELECT * FROM Usuarios;
      `)
    return usuarios
  }

  static async getByEmail({ email }) {
    const [usuario] = await connection.query(`
        SELECT 
          BIN_TO_UUID(id_usuario) id_usuario, 
          nombre, 
          apellido, 
          email, 
          password, 
          rol 
        FROM Usuarios WHERE email = ?;
      `, [email])
    if (usuario.length === 0) throw new Error('No existe usuario con ese email')
    return usuario[0]
  }

  static async authenticate({ email, pw }) {
    // Verifica si el usuario con el email existe
    const [userQuery] = await connection.query(`
        SELECT * FROM Usuarios WHERE email = ?;
      `, [email])
    if (userQuery.length === 0) throw new Error('No existe usuario con ese email')
    // verifica si la contraseña concuerda
    const [{ password }] = userQuery
    if (password !== pw) return false
    return userQuery[0]
  }

  static async register({ input }) {
    const { nombre, apellido, email, password, rol } = input

    // verificar si el usuario ya existe
    const [emailQuery] = await connection.query(`
        SELECT email FROM Usuarios WHERE email = ?;
      `, [email])
    if (emailQuery.length > 0) throw new Error('El email ya está registrado')

    // generar uuid desde la bd
    const [uuidResult] = await connection.query(`
        SELECT UUID() uuid;
      `)
    const [{ uuid }] = uuidResult
    
    // registrar usuario
    try {
      await connection.query(`
        INSERT INTO Usuarios (id_usuario, nombre, apellido, email, password, rol)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?);
      `, [uuid, nombre, apellido, email, password, rol])
    } catch (error) {
      throw new Error('Error al registrar usuario')
    }

    // obtener el usario registrado desde el uuid creado
    const [usuarioQuery] = await connection.query(`
        SELECT
          BIN_TO_UUID(id_usuario) id_usuario,
          nombre,
          apellido,
          email,
          password,
          rol
        FROM Usuarios 
        WHERE BIN_TO_UUID(id_usuario) = ?;
      `, [uuid])
    
    const usuario = usuarioQuery[0]

    return usuario
  }
}