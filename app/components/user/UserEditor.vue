<template>
  <EditorCard
    name="user"
    :modelId="props.userId"
    :action="props.action"
    :attributes="userAttributes"
    :initialValue="initialValue"
    :options="options"
    :isSaved="isSaved"
    :redirectBack="{ name: 'admin:users' }"
    :schema="schema"
    @create="createUser"
    @update="updateUser"
    @delete="deleteUser"
  />
</template>

<script setup>
const props = defineProps({
  action: {
    type: String,
    default: "edit",
    validator: (value) => _includes(["create", "edit"], value)
  },

  userId: {
    type: String,
    validator: (value, props) =>
      props.action === "create" || (_isString(value) && !_isEmpty(value))
  }
})

const {
  $socketio: { socket }
} = useNuxtApp()

const toast = useToast()

const userAttributes = {
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

if (props.action !== "create") {
  _unset(userAttributes, "password")
}

const emptyUser = _mapValues(userAttributes, "initialValue")

async function getUser(userId) {
  const { data: response } = await useAsyncData(
    `user:read:${userId}`,
    async () => {
      const { data: response } = await socket
        .timeout(3000)
        .emitWithAck("user:read", userId)
      return response
    },
    { transform: deepParseTimestamps }
  )

  return _pick(response.value, _keys(userAttributes))
}

const initialValue =
  props.action === "create" ? emptyUser : await getUser(props.userId)

const schema = props.action === "create" ? createUserSchema : updateUserSchema
const options = _mapValues(userAttributes, "options")
const isSaved = ref(false)

async function createUser(user) {
  const { data, error } = await socket
    .timeout(3000)
    .emitWithAck("user:create", user)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Saved.",
      detail: "The user is saved.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "admin:users" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Create Error.",
      detail: error
    })
  }
}

async function updateUser(editedFields) {
  const { data, error } = await socket
    .timeout(3000)
    .emitWithAck("user:update", props.userId, editedFields)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Updated.",
      detail: "The user is updated.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "admin:users" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Update Error.",
      detail: error
    })
  }
}

async function deleteUser() {
  const { data, error } = await socket
    .timeout(3000)
    .emitWithAck("user:delete", props.userId)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Deleted.",
      detail: "The user is deleted.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "admin:users" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Delete Error.",
      detail: error
    })
  }
}
</script>

<style scoped></style>
