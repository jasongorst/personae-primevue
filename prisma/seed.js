import "dotenv/config"
import { includes, isArray, isPlainObject, map, mapValues, omit } from "lodash-es"
import prisma from "../shared/utils/prisma.js"
import { serverAuth } from "../server/utils/auth.js"
import characters from "./seeds/Character.json" with { type: "json" }

function parseTimestamps(value, key) {
  if (includes(["createdAt", "updatedAt"], key)) {
    return new Date(value)
  } else {
    return value
  }
}

function deepConvertValues(object, converter) {
  // converter called with (value, key, object)
  if (isArray(object)) {
    return map(object, (element) => deepConvertValues(element, converter))
  } else if (isPlainObject(object)) {
    return mapValues(
      object,
      (value, key, object) => {
        if (isArray(value) || isPlainObject(value)) {
          return deepConvertValues(value, converter)
        } else {
          return converter(value, key, object)
        }
      }
    )
  } else {
    return object
  }
}

function deepParseTimestamps(object) {
  return deepConvertValues(object, parseTimestamps)
}

async function seedCharacter() {
  const characterSeeds = deepParseTimestamps(
    map(characters, (character) => omit(character, ["id"]))
  )

  const { count } = await prisma.character.createMany({
    data: characterSeeds
  })

  console.log(`${count} characters created.`)
}

async function seedAuth() {
  // noinspection JSUnresolvedReference
  const { user } = await serverAuth().api.signUpEmail({
    body: {
      email: "jason@evilpaws.org",
      password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp.",
      name: "Jason Gorst",
      username: "gyrf"
    },
  })

  const adminUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: "admin" }
  })

  console.log("created admin user.\n", adminUser)
}

async function main() {
  await seedCharacter()
  await seedAuth()
}

main()
  .catch(async (error) => {
    if (error.meta?.message !== "not an error") {
      console.error(error)
      process.exit(1)
    }
  })
  .finally(async () => await prisma.$disconnect())
