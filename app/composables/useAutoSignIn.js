export default async function useAutoSignIn() {
  const { signIn } = useAuth()

  const credentials = {
    email: "jason@evilpaws.org",
    password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp."
  }
  
  try {
    await signIn(credentials, { redirect: false })
  } catch (error) {
    console.log("[signIn error]", error)
  }
}
