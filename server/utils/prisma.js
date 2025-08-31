import { PrismaClient } from "~~/prisma/generated/prisma/client"
import { get, isNull } from "lodash-es"

export default new PrismaClient().$extends({
  query: {
    character: {
      async $allOperations({ _model, _operation, args, query }) {
        if (get(args, "data.description") === "") {
          args.data.description = null
        }

        if (get(args, "data.notes") === "") {
          args.data.notes = null
        }

        return query(args)
      }
    }
  },

  result: {
    character: {
      description: {
        needs: { description: true },
        compute(user) {
          if (isNull(user.description)) {
            return ""
          } else {
            return user.description
          }
        }
      },

      notes: {
        needs: { notes: true },
        compute(user) {
          if (isNull(user.notes)) {
            return ""
          } else {
            return user.notes
          }
        }
      }
    }
  }
})
