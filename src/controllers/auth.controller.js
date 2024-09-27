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
    const input = { nombre, apellido, email, password, rol }
    try {
      await this.usuarioModel.register({ input })
      return res.json({ message: 'Usuario registrado' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}