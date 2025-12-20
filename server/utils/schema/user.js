import * as z from "zod"

export const userSchema = z.object({
  id: z
    .string()
    .length(32)
    .regex(/^[a-zA-Z0-9]+$/),
  name: z.string().trim(),
  email: z.email().trim(),
  emailVerified: z.boolean(),
  // image: z.httpUrl().nullable(),
  // banExpires: z.date().nullable(),
  // banReason: z.string().trim().nullable(),
  // banned: z.boolean().nullable(),
  role: z.enum(["user", "admin"]).nullable(),
  username: z.string().trim(),
  password: z.string().min(12)
})

export const createUserSchema = userSchema.omit({ id: true })
export const updateUserSchema = createUserSchema.omit({ password: true }).partial()
