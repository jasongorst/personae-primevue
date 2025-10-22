import { reach } from "yup"

export default function validateId(id) {
  const idSchema = reach(characterSchema, "id")
  // noinspection JSUnresolvedReference
  return idSchema.validateSync(id)
}
