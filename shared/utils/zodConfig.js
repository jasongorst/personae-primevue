import * as z from "zod"

export default function zodConfig() {
  z.config({
    customError: (issue) => {
    switch (issue.code) {
      case "too_small":
        return `Must be at least ${issue.minimum} characters.`
      case "too_big":
        return `Cannot be longer than ${issue.maximum} characters.`
    }
  }
  })

}
