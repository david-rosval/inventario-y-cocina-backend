import { verifyToken } from '../libs/jwt.js'

export class AuthMiddleware {
  authRequired = async (req, res, next) => {
    const { authorization: token } = req.headers

    if (!token) {
      console.log('No se encontró el token')
      return res.status(401).json({ error: 'No se encontró el token' })
    }

    try {
      const usuario = await verifyToken(token)
      req.usuario = usuario
      console.log('token valido')
      console.log(req.usuario)
      next()
    } catch (error) {
      console.log('Token inválido')
      return res.status(403).json({ error: 'Token inválido' })
    }
  }

  adminRequired = async (req, res, next) => {
    const { rol } = req.usuario
    if (!rol) {
      console.log('No se encuentra el rol del usuario')
      return res.status(403).json({ error: 'Operación denegada por falta de información del usuario' })
    }
    if (rol !== 'Administrador') {
      console.log('Operación denegada por falta de permisos')
      return res.status(403).json({ error: 'Operación denegada por falta de permisos' })
    }
    next()
  }
}
