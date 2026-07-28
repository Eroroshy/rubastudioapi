import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      error: 'El correo electrónico es obligatorio.',
    })
    .email('Formato de correo electrónico inválido.')
    .toLowerCase()
    .trim(),

  password: z
    .string({
      error: 'La contraseña es obligatoria.',
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

export type LoginInput = z.infer<typeof loginSchema>;