import "dotenv/config"
import { includes, isArray, isPlainObject, map, mapValues, omit } from "lodash-es"
import { faker } from "@faker-js/faker"
import prisma from "../server/utils/prisma.js"
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

async function seedCharacters() {
  const characterSeeds = deepParseTimestamps(
    map(characters, (character) => omit(character, ["id"]))
  )

  const { count } = await prisma.character.createMany({
    data: characterSeeds
  })

  console.log(`Created ${count} characters.`)
}

async function seedAdmin() {
  // noinspection JSUnresolvedReference,SpellCheckingInspection
  const adminUser = await serverAuth().api.createUser({
    body: {
      email: "jason@evilpaws.org",
      password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp.",
      name: "Jason Gorst",
      role: "admin",
      data: { username: "gyrf" }
    }
  })

  console.log("Created admin user.", adminUser)
}

async function seedUsers(n) {
  for (let i = 1; i <= n; i++ ) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = faker.person.fullName({ firstName, lastName })
    const username = faker.internet.username({ firstName, lastName })
    const email = faker.internet.email({ firstName, lastName })
    const password = faker.internet.password()

    console.log(email, password, name, username)

    // noinspection JSUnresolvedReference
    await serverAuth().api.createUser({
      body: {
        email,
        password,
        name,
        role: "user",
        data: { username }
      }
    })
  }

  console.log(`Created ${n} user(s).`)
}

async function main() {
  await seedCharacters()
  await seedAdmin()
  await seedUsers(5)
}

main()
  .catch(async (error) => {
    if (error.meta?.message !== "not an error") {
      console.error(error)
      process.exit(1)
    }
  })
  .finally(async () => await prisma.$disconnect())
