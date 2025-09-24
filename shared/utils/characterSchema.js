import { number, object, string } from "yup"

export default object({
  id: number().positive().integer().notRequired(),
  player: string().trim().nullable(),
  mortalName: string().trim().nullable(),
  faeName: string().trim().nullable(),
  rank: string().trim().nullable(),
  kith: string().trim().nullable(),
  location: string().trim().nullable(),
  position: string().trim().nullable(),
  seeming: string().trim().nullable(),
  house: string().trim().nullable(),
  bannerhouse: string().trim().nullable(),
  description: string().trim().ensure(),
  notes: string().trim().ensure()
})
