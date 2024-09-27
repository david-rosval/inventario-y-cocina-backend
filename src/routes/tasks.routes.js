import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'

export const createTasksRouter = () => {
  const authRouter = Router()

  const authMiddleware = new AuthMiddleware()

  authRouter.get('/', authMiddleware.authRequired, (req, res) => {
    res.send('Tasks router')
  })

  return authRouter
}
