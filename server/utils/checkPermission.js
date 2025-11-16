export default async function checkPermissions(userId, resource, permissions) {
  permissions = _flatten([permissions])

  // noinspection JSUnresolvedReference
  const { success } = await auth.api.userHasPermission({
    body: {
      userId,
      permissions: {
        [resource]: permissions
      }
    }
  })

  return success
}
