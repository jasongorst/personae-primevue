import { int, object, string } from "zod"

export default object({
  id: int().positive(),
  player: string().trim(),
  mortalName: string().trim(),
  faeName: string().trim(),
  rank: string().trim(),
  kith: string().trim(),
  location: string().trim(),
  position: string().trim(),
  seeming: string().trim(),
  house: string().trim(),
  bannerhouse: string().trim(),
  description: string().trim(),
  notes: string().trim(),
  descriptionPlainText: string().trim(),
  notesPlainText: string().trim()
})
