import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().min(8).max(50),
    email: z.string().min(8).max(50).email(),
    password: z.string().min(8).max(16),
    password_confirmation: z.string().min(8).max(16),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords must match',
    path: ['password_confirmation'],
  })

export const loginSchema = z.object({
  email: z.string().min(8).max(50).email(),
  password: z.string().min(8).max(16),
})
