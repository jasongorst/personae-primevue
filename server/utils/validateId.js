// noinspection JSUnresolvedReference

import { reach } from "yup"

export default function validateId(id) {
  const idSchema = reach(characterSchema, "id")

  try {
    return { validId: idSchema.validateSync(id) }
  } catch (error) {
    return { error }
  }
}
