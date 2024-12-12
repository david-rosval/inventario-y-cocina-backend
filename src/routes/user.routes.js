import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
import { ValidatorMiddleware } from '../middlewares/validator.middleware.js'
import { registerSchema, updateUserPasswordSchema, updateUserSchema } from '../schemas/auth.schema.js'

export const createUserRouter = ({ usuarioModel }) => {
  const userRouter = Router()

  const userController = new UserController({ usuarioModel })
  const authMiddleware = new AuthMiddleware()
  const validatorMiddleware = new ValidatorMiddleware()

  userRouter.get('/test', (req, res) => { res.send('User router working') })

  userRouter.get('/',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    userController.getAllUsers
  )

  userRouter.get('/:id',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    userController.getUserById
  )

  userRouter.post('/',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    validatorMiddleware.validateSchema(registerSchema),
    userController.registerUser
  )

  userRouter.put('/:id',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    validatorMiddleware.validateSchema(updateUserSchema),
    userController.updateUser
  )

  userRouter.put('/new-password/:id',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    validatorMiddleware.validateSchema(updateUserPasswordSchema),
    userController.updateUserPassword
  )

  userRouter.post('/delete',
    authMiddleware.authRequired,
    authMiddleware.adminRequired,
    userController.deleteUser
  )

  return userRouter
}
