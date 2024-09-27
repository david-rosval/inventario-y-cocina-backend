import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'

export class AuthController {
  constructor({ usuarioModel }) {
    this.usuarioModel = usuarioModel
  }

  authenticate = async (req, res) => {
    const { email, password } = req.body
    try {
      const authenticated = await this.usuarioModel.authenticate({ email, password })
      if (!authenticated) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
      }
      return res.json({ message: 'Autenticación exitosa' })
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  register = async (req, res) => {
    const { nombre, apellido, email, password, rol } = req.body
    try {
      // se encripta la contraseña
      const pwHash = await bcrypt.hash(password, 10)
      const input = { nombre, apellido, email, password: pwHash, rol }

      // registro del usuario y obtención del usuario registrado
      const usuarioRegistrado = await this.usuarioModel.register({ input })
      const { password, ...usuario } = usuarioRegistrado

      // se genera el token
      const token = await createAccessToken({ id: usuarioRegistrado.id_usuario })
      
      // se envía el token en la cookie y el usuario registrado
      res.cookie('token', token)
      res.json({ message: 'Usuario registrado', usuario })
      
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}