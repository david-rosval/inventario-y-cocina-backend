import { pool } from '../db.js'

export class UsuarioModel {
  static async getAll () {
    const connection = await pool.getConnection()
    try {
      const [usuarios] = await connection.query(`
        SELECT * FROM Usuarios;
      `)
      return usuarios
    } catch (error) {
      throw new Error('Error al obtener los usuarios')
    } finally {
      connection.release()
    }
  }

  static async getById ({ idUsuario }) {
    const connection = await pool.getConnection()
    try {
      const [usuario] = await connection.query(`
        SELECT 
          BIN_TO_UUID(id_usuario) id_usuario, 
          nombre, 
          apellido, 
          email, 
          password, 
          rol 
        FROM Usuarios WHERE BIN_TO_UUID(id_usuario) = ?;
      `, [idUsuario])
      if (usuario.length === 0) throw new Error('El usuario no existe')
      return usuario[0]
    } catch (error) {
      throw new Error('Error al obtener el usuario por id')
    } finally {
      connection.release()
    }
  }

  static async getByEmail ({ email }) {
    const connection = await pool.getConnection()
    try {
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
    } catch (error) {
      throw new Error('Error al obtener el usuario por email')
    } finally {
      connection.release()
    }
  }

  static async register ({ input }) {
    const connection = await pool.getConnection()
    try {
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
      await connection.query(`
        INSERT INTO Usuarios (id_usuario, nombre, apellido, email, password, rol)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?);
      `, [uuid, nombre, apellido, email, password, rol])

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
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    } finally {
      connection.release()
    }
  }
}
