import "dotenv/config"
import * as postmark from "postmark"

export default async function sendResetPassword({ user, url }) {
  const postmarkClient = new postmark.ServerClient(process.env.NUXT_POSTMARK_SERVER_TOKEN)

  const response = await postmarkClient.sendEmail({
    From: "personae.evilpaws.org <admin@evilpaws.org>",
    To: user.email,
    Subject: "Password reset requested.",
    TextBody: `Click to reset your password: ${url}`
  })

  console.log("Sending password reset email.")
  console.log(response.To)
  console.log(response.SubmittedAt)
  console.log(response.Message)
  console.log(response.MessageID)
  console.log(response.ErrorCode)

  return response
}
