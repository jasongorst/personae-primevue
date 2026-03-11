export default {
  email: { type: "text", initialValue: "" },
  password: { type: "text", initialValue: "" },
  name: { type: "text", initialValue: "" },
  username: { type: "text", initialValue: "" },

  role: {
    type: "select",
    options: ["user", "admin"],
    initialValue: "user"
  }
}
