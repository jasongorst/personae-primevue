import "dotenv/config"
import { PrismaClient } from "../../prisma/generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.NUXT_PRISMA_DATABASE_URL
})

export default new PrismaClient({ adapter })
