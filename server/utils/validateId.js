export default function validateId(id) {
  return characterSchema.shape.id.parse(id)
}
