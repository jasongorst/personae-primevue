export default class AuthError extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = "AuthError"
    this.resource = options?.resource
    this.permissions = options?.permissions
  }
}
