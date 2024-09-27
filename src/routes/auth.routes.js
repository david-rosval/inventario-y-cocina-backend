import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
import { ValidatorMiddleware } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

export const createAuthRouter = ({ usuarioModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ usuarioModel })
  const authMiddleware = new AuthMiddleware()
  const validatorMiddleware = new ValidatorMiddleware()

  authRouter.get('/', (req, res) => {
    res.send('Auth router')
  })

  authRouter.post('/register',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    validatorMiddleware.validateSchema(registerSchema),
    authController.register
  )

  authRouter.post('/login', validatorMiddleware.validateSchema(loginSchema), authController.login)

  authRouter.post('/logout', authController.logout)

  authRouter.get('/profile', authMiddleware.authRequired, authController.profile)

  authRouter.get('/verify', authController.verify)

  return authRouter
}
