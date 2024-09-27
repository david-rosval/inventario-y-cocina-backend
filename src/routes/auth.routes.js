import express, { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const createAuthRouter = ({ usuarioModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ usuarioModel })
  
  authRouter.get('/', (req, res) => {
    res.send('Auth router')
  })
  
  authRouter.post('/register', authController.register)
  
  authRouter.post('/login', async (req, res) => {
    
  })

  return authRouter
}