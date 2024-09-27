import express, { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'

export const createAuthRouter = ({ usuarioModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ usuarioModel })
  const authMiddleware = new AuthMiddleware()
  
  authRouter.get('/', (req, res) => {
    res.send('Auth router')
  })
  
  authRouter.post('/register', authController.register)
  
  authRouter.post('/login', authController.login)

  authRouter.post('/logout', authController.logout)
  
  authRouter.get('/profile', authMiddleware.authRequired, authController.profile)

  return authRouter
}