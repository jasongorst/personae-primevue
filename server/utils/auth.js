// noinspection ES6PreferShortImport

import "dotenv/config"
import prisma from "./prisma.js"
import { betterAuth } from "better-auth"
import { admin as adminPlugin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { additionalFields } from "../../shared/utils/auth/additionalFields.js"
import { ac, admin, user } from "../../shared/utils/auth/permissions.js"
import sendResetPassword from "../../shared/utils/auth/sendResetPassword.js"
import sendVerificationEmail from "../../shared/utils/auth/sendVerificationEmail.js"

const auth = betterAuth({
  baseURL: process.env.NUXT_BETTER_AUTH_BASE_URL,
  secret: process.env.NUXT_BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  advanced: { database: { generateId: false } },
  account: { accountLinking: { enabled: true } },
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  user: { additionalFields: additionalFields.user },

  emailAndPassword: {
    enabled: true,
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
