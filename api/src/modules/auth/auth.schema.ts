import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "El correo electrónico es obligatorio." })
    .email("Formato de correo electrónico inválido.")
    .toLowerCase()
    .trim(),
  password: z
    .string({ message: "La contraseña es obligatoria." })
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;
