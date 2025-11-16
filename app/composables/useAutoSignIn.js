export default async function useAutoSignIn() {
  const { signIn } = useAuthClient()

  const credentials = {
    email: "jason@evilpaws.org",
    password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp."
  }

  const { data, error } = await signIn.email(credentials)

  if (error) {
    console.error("[useAutoSignIn error]", error)
  } else {
    console.dir(data)
  }
}
