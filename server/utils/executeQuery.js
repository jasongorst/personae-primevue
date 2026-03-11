const LOG_RESULT = false

export default async function executeQuery({
  callback,
  user,
  resource,
  permissions,
  id,
  data,
  idValidator = _identity,
  validator = _identity,
  mutator = _identity,
  query = _noop
}) {
  try {
    if (permissions) {
      await authorize(user, resource, permissions)
    }

    let validId, validData

    if (id) {
      validId = idValidator(id)
    }

    if (data) {
      validData = validator(data)
    }

    const rawResult = await query({ id: validId, data: validData })
    const result = mutator(rawResult)

    if (LOG_RESULT) {
      console.log("[executeQuery]")
      console.dir(result)
    }

    callback({ data: result })
    return result
  } catch (error) {
    console.error(error)

    callback({ error })
  }
}
