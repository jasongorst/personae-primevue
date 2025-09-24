import { reach } from "yup"
import characterSchema from "./characterSchema.js"

export default function validateId(id) {
  try {
    const idSchema = reach(characterSchema, "id")
    // noinspection JSUnresolvedReference
    return { validId: idSchema.validateSync(id) }
  } catch (error) {
    return { error }
  }
}
