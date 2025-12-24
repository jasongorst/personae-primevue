import { betterAuth } from "better-auth"
import { admin as adminPlugin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma.js"
import { additionalFields } from "./auth/additionalFields.js"
import { ac, admin, user } from "./auth/permissions.js"
import sendResetPassword from "./auth/sendResetPassword.js"
import sendVerificationEmail from "./auth/sendVerificationEmail.js"

const config = useRuntimeConfig()

const auth = betterAuth({
  baseURL: config.betterAuth.baseURL,
  secret: config.betterAuth.secret,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  account: { accountLinking: { enabled: true } },
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  user: { additionalFields: additionalFields.user },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    sendResetPassword: async ({user, url, _token}, _request) => sendResetPassword({ user, url }),
    onPasswordReset: async ({ user }) =>
      console.log("[onPasswordReset]", user.email)
  },
  emailVerification: { sendVerificationEmail },
  plugins: [adminPlugin({ ac, roles: { admin, user } })]
})

let _auth

function serverAuth() {
  if (!_auth) {
    _auth = auth
  }

  return _auth
}

export { auth, serverAuth }
