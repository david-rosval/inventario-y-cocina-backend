import { verifyToken } from "../libs/jwt.js"

export class AuthMiddleware {
  authRequired = async (req, res, next) => {
    const { token } = req.cookies
    
    if (!token) {
      return res.status(401).json({ message: 'No se encontró el token' })
    }
    
    try {
      const usuario = await verifyToken(token)
      req.usuario = usuario
      next()
    } catch (error) {
      return res.status(403).json({ message: 'Token inválido' })
    }
  }

  adminRequired = async (req, res, next) => {
    const { rol } = req.usuario
    if (rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado' })
    }
    next()
  }

}