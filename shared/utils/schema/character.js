import * as z from "zod"

zodConfig()

export const characterSchema = z.object({
  id: z.coerce.number().int().positive(),
  player: z.string().trim(),
  mortalName: z.string().trim(),
  faeName: z.string().trim(),
  rank: z.string().trim(),
  kith: z.string().trim(),
  location: z.string().trim(),
  position: z.string().trim(),
  seeming: z.string().trim(),
  house: z.string().trim(),
  bannerhouse: z.string().trim(),
  description: z.string().trim(),
  notes: z.string().trim(),
  descriptionPlainText: z.string().trim(),
  notesPlainText: z.string().trim()
})

export const createCharacterSchema = characterSchema.omit({ id: true })
export const updateCharacterSchema = createCharacterSchema.partial()
