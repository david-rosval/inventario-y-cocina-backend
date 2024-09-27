import z from 'zod'

export const registerSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es requerido' }),
  apellido: z.string({ required_error: 'El apellido es requerido' }),
  email: z.string({ required_error: 'El email es requerido' }).email({ message: 'El email no es válido' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['Administrador', 'Cocinero', 'Mozo/Cajero'], { required_error: 'El rol es requerido' })
})

export const loginSchema = z.object({
  email: z.string({ required_error: 'El email es requerido' }).email({ message: 'El email no es válido' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(6, 'La contraseña debe tener al menos 6 caracteres')
})
