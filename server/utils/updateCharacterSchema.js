// noinspection JSUnresolvedReference
import { object, reach } from "yup"

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
  descriptionPlainText: reach(characterSchema, "descriptionPlainText").optional(),
  notesPlainText: reach(characterSchema, "notesPlainText").optional(),
  locked: reach(characterSchema, "locked"),
  lockedBy: reach(characterSchema, "lockedBy"),
  lockedAt: reach(characterSchema, "lockedAt")
})
