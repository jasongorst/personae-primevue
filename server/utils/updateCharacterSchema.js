import { object, string } from "yup"

export default object({
  player: string().trim().optional(),
  mortalName: string().trim().optional(),
  faeName: string().trim().optional(),
  rank: string().trim().optional(),
  kith: string().trim().optional(),
  location: string().trim().optional(),
  position: string().trim().optional(),
  seeming: string().trim().optional(),
  house: string().trim().optional(),
  bannerhouse: string().trim().optional(),
  description: string().trim().optional(),
  notes: string().trim().optional()
})
