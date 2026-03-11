export default async function authorize(user, resource, permissions) {
  if (_isNil(user)) {
    throw new AuthError(`You must be signed in to modify ${resource}s.`, {
      resource,
      permissions
    })
  }

  permissions = _flatten([permissions])

  // noinspection JSUnresolvedReference
  const result = await auth.api.userHasPermission({
    body: {
      userId: user.id,
      permissions: { [resource]: permissions }
    }
  })

  if (!result.success) {
    throw new AuthError(
      `${user.username} isn't allowed to modify ${resource}s.`,
      { resource, permissions }
    )
  }
}
