import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma.js"
import { admin as adminPlugin } from "better-auth/plugins"
import { additionalFields } from "./auth/additionalFields.js"
import { ac, admin, user } from "./auth/permissions.js"

const config = useRuntimeConfig()

const auth = betterAuth({
  baseURL: config.betterAuth.baseURL,
  secret: config.betterAuth.secret,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  account: { accountLinking: { enabled: true } },
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  user: { additionalFields: additionalFields.user },
  emailAndPassword: { enabled: true },
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
