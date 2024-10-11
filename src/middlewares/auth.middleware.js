import { verifyToken } from '../libs/jwt.js'

export class AuthMiddleware {
  authRequired = async (req, res, next) => {
    const { authorization: token } = req.headers

    if (!token) {
      return res.status(401).json({ error: 'No se encontró el token' })
    }

    try {
      const usuario = await verifyToken(token)
      req.usuario = usuario
      console.log('token valido')
      next()
    } catch (error) {
      return res.status(403).json({ error: 'Token inválido' })
    }
  }

  adminRequired = async (req, res, next) => {
    const { rol } = req.usuario
    if (rol !== 'Administrador') {
      return res.status(403).json({ error: 'Operación denegada por falta de permisos' })
    }
    next()
  }
}
