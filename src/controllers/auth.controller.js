import bcrypt from 'bcrypt'
import { createAccessToken, verifyToken } from '../libs/jwt.js'

export class AuthController {
  constructor ({ usuarioModel }) {
    this.usuarioModel = usuarioModel
  }

  login = async (req, res) => {
    const { email, password } = req.body
    try {
      // se verifica si existe un usuario con el email dado
      const usuarioEncontrado = await this.usuarioModel.getByEmail({ email })

      // se verifica si la contraseña es válida
      const isValidPassword = await bcrypt.compare(password, usuarioEncontrado.password)

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      // se genera el token
      const token = await createAccessToken({ id: usuarioEncontrado.id_usuario, rol: usuarioEncontrado.rol })

      // no se envía la contraseña en la respuesta
      const { password: pw, ...usuario } = usuarioEncontrado

      // se envía el token en la cookie y el usuario registrado
      res.cookie('token', token, { httpOnly: true })
      res.json({ message: 'Sesión iniciada', usuario, token })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
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
      const { password: pw, ...usuario } = usuarioRegistrado

      res.json({ message: 'Usuario registrado', usuario })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  logout = async (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Sesión cerrada' })
  }

  profile = async (req, res) => {
    const { id } = req.usuario
    try {
      const usuarioEncontrado = await this.usuarioModel.getById({ idUsuario: id })
      const { password, ...usuario } = usuarioEncontrado
      console.log('perfil de usuario enviado')
      res.json(usuario)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  verify = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ error: 'No se encontró el token' })

    try {
      const usuario = await verifyToken(token)
      const { id } = usuario
      const usuarioEncontrado = await this.usuarioModel.getById({ idUsuario: id })
      const { password, ...user } = usuarioEncontrado
      res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(403).json({ error: 'Token inválido' })
    }
  }
}
