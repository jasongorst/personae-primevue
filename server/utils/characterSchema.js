import { boolean, date, mixed, number, object, string } from "yup"
import { isNil } from "lodash-es"

const nil = mixed().notRequired().test(
  "is-nil",
  "${path} must be null or undefined",
  (value) => isNil(value)
)

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
  notesPlainText: string().trim().defined(),
  locked: boolean().optional(),
  
  lockedBy: string().notRequired().when("locked", {
    is: true,
    then: (schema) => schema.trim().required(),
    otherwise: () => nil
  }),
  
  lockedAt: date().notRequired().when("locked", {
    is: true,
    then: (schema) => schema.required().default(new Date()),
    otherwise: () => nil
  })
})
