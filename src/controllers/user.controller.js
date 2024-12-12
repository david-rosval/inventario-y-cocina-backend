import bcrypt from 'bcrypt'

export class UserController {
  constructor ({ usuarioModel }) {
    this.usuarioModel = usuarioModel
  }

  getAllUsers = async (req, res) => {
    try {
      const usuariosEncontrados = await this.usuarioModel.getAllUsers()
      const usuarios = usuariosEncontrados.map(usuario => {
        const { password, ...user } = usuario
        return user
      })
      return res.json(usuarios)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'User id not provided' })
    try {
      const usuarioEncontrado = await this.usuarioModel.getById({ idUsuario: id })
      const { password, ...usuario } = usuarioEncontrado
      return res.json(usuario)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  registerUser = async (req, res) => {
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

  updateUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!id) return res.status(404).json({ message: 'User id not provided' })
    const { nombre, apellido, email, rol } = req.body
    try {
      const input = { nombre, apellido, email, rol }

      // se actualiza el usuario y obtención del usuario actualizado
      const usuarioActualizado = await this.usuarioModel.update({ id, input })
      const { password: pw, ...usuario } = usuarioActualizado

      return res.json({ message: 'Usuario actualizado', usuario })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  updateUserPassword = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'User id not provided' })
    const { password, newPassword } = req.body
    try {
      // se verifica si existe un usuario con el email dado
      const usuarioEncontrado = await this.usuarioModel.getById({ idUsuario: id })

      // se verifica si la contraseña es válida
      const isValidPassword = await bcrypt.compare(password, usuarioEncontrado.password)

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Contraseña incorrecta' })
      }

      // se encripta la nueva contraseña
      const pwHash = await bcrypt.hash(newPassword, 10)

      // se actualiza la contraseña y obtención del usuario actualizado
      const usuarioActualizado = await this.usuarioModel.updatePassword({ id, pw: pwHash })
      const { password: pw, ...usuario } = usuarioActualizado

      return res.json({ message: 'Contraseña actualizada', usuario })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  deleteUser = async (req, res) => {
    console.log('Eliminar usuario backend')
    const { ids } = req.body
    console.log(ids)
    if (!ids) return res.status(404).json({ message: 'User(s) id not provided' })
    try {
      await this.usuarioModel.delete({ ids })
      res.json({ message: 'Usuario(s) eliminado(s)' })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }
}
