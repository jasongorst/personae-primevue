import "dotenv/config"
import * as postmark from "postmark"

export default async function sendVerificationEmail({ user, url }) {
  const postmarkClient = new postmark.ServerClient(process.env.NUXT_POSTMARK_SERVER_TOKEN)

  const response = await postmarkClient.sendEmail({
    From: "admin@evilpaws.org",
    To: user.email,
    Subject: "Verify your email address.",
    TextBody: `Click to verify your email address: ${url}`
  })

  console.log("Sending verification email.")
  console.log(response.To)
  console.log(response.SubmittedAt)
  console.log(response.Message)
  console.log(response.MessageID)
  console.log(response.ErrorCode)

  return response
}
