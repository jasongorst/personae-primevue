// noinspection JSUnresolvedReference

import { addMethod, object, reach, string } from "yup"

addMethod(string, "plainTextWhen", function plainTextWhen(field) {
  return this.when(field, {
    is: (value) => !_isUndefined(value),
    then: (schema) => schema.ensure(),
    otherwise: (schema) =>
      schema
        .optional()
        .test(
          "isUndefined",
          `not allowed without ${field}`,
          (value) => _isUndefined(value)
        )
  })
})

export default object({
  player: reach(characterSchema, "player").optional(),
  mortalName: reach(characterSchema, "mortalName").optional(),
  faeName: reach(characterSchema, "faeName").optional(),
  rank: reach(characterSchema, "rank").optional(),
  kith: reach(characterSchema, "kith").optional(),
  location: reach(characterSchema, "location").optional(),
  position: reach(characterSchema, "position").optional(),
  seeming: reach(characterSchema, "seeming").optional(),
  house: reach(characterSchema, "house").optional(),
  bannerhouse: reach(characterSchema, "bannerhouse").optional(),
  description: reach(characterSchema, "description").optional(),
  notes: reach(characterSchema, "notes").optional(),

  descriptionPlainText: reach(
    characterSchema,
    "descriptionPlainText"
  ).plainTextWhen("description"),

  notesPlainText: reach(characterSchema, "notesPlainText").plainTextWhen(
    "notes"
  ),

  locked: reach(characterSchema, "locked"),
  lockedBy: reach(characterSchema, "lockedBy"),
  lockedAt: reach(characterSchema, "lockedAt")
})
