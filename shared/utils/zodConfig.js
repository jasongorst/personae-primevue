import * as z from "zod"

export default function zodConfig() {
  return z.config({
    customError: (issue) => {
      switch (issue.code) {
        case "too_small":
          if (issue.origin === "string" && _isEmpty(issue.input)) {
            return "Cannot be blank."
          } else {
            return `Must be at least ${issue.minimum} characters.`
          }
        case "too_big":
          return `Cannot be longer than ${issue.maximum} characters.`
      }
    }
  })
}
