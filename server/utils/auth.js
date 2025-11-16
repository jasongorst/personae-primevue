import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "../../shared/utils/prisma.js"
import { admin as adminPlugin } from "better-auth/plugins"
import { additionalFields } from "./auth/additionalFields.js"
import { ac, admin, user } from "./auth/permissions.js"

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
    },
  },

  plugins: [
    adminPlugin({
      ac,
      roles: { admin, user }
    })
  ],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // cache duration in seconds
    }
  },

  user: {
    additionalFields: additionalFields.user
  }
})

let _auth

function serverAuth() {
  if (!_auth) {
    _auth = auth
  }

  return _auth
}

export { auth, serverAuth }
