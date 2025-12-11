import { PrismaClient } from "~~/prisma/generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg"

const config = useRuntimeConfig()

const adapter = new PrismaPg({
  connectionString: config.prismaDatabaseURL
})

export default new PrismaClient({ adapter })
