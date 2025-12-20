import * as postmark from "postmark"

const config = useRuntimeConfig()

export default function sendResetPassword({ user, url }) {
  const postmarkClient = new postmark.ServerClient(config.postmarkServerToken)

  postmarkClient
    .sendEmail({
      From: "admin@evilpaws.org",
      To: user.email,
      Subject: "Password reset requested.",
      TextBody: `Click to reset your password: ${url}`
    })
    .then((response) => {
      console.log("Sending password reset email.")
      console.log(response.To)
      console.log(response.SubmittedAt)
      console.log(response.Message)
      console.log(response.MessageID)
      console.log(response.ErrorCode)
    })
}
