import * as z from "zod"

zodConfig()

export const userSchema = z.object({
  id: z.uuidv4("Invalid id."),
  name: z.string().trim().min(2),
  email: z.email("Must be a valid email address.").trim(),
  role: z.enum(["user", "admin"], "Must be either 'user' or 'admin'."),
  username: z.string().trim().min(2),
  password: z.string().min(12)
})

export const createUserSchema = userSchema.omit({ id: true })

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .partial()
