import { number, object, string } from "yup"

export default object({
  id: number().positive().integer().required(),
  player: string().trim().defined(),
  mortalName: string().trim().defined(),
  faeName: string().trim().defined(),
  rank: string().trim().defined(),
  kith: string().trim().defined(),
  location: string().trim().defined(),
  position: string().trim().defined(),
  seeming: string().trim().defined(),
  house: string().trim().defined(),
  bannerhouse: string().trim().defined(),
  description: string().trim().defined(),
  notes: string().trim().defined(),
  descriptionPlainText: string().trim().defined(),
  notesPlainText: string().trim().defined()
})
