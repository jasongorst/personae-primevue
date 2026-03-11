<template>
  <EditorCard
    name="user"
    :modelId="props.userId"
    :action="props.action"
    :attributes="userAttributes"
    :initialValue="props.initialValue"
    :options="options"
    :isSaved="isSaved"
    :redirectBack="{ name: 'admin:users' }"
    :schema="schema"
    @create="create"
    @update="update"
    @delete="destroy"
  />
</template>

<script setup>
const props = defineProps({
  action: {
    type: String,
    default: "update",
    validator: (value) => _includes(["create", "update"], value)
  },

  userId: {
    type: String,
    validator: (value, props) =>
      props.action === "create" || (_isString(value) && !_isEmpty(value))
  },

  initialValue: {
    type: Object,
    default: {},
    required: false
  }
})

const {
  $socketio: { socket }
} = useNuxtApp()

const toast = useToast()
const { createUser } = useCreateUser()
const { updateUser } = useUpdateUser()
const { deleteUser } = useDeleteUser()

if (props.action !== "create") {
  _unset(userAttributes, "password")
}

const schema = props.action === "create" ? createUserSchema : updateUserSchema
const options = _mapValues(userAttributes, "options")
const isSaved = ref(false)

async function create(user) {
  createUser(user)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Saved.",
    detail: "The user is saved.",
    life: 3000
  })

  await navigateTo({ name: "admin:users" })
}

async function update(editedFields) {
  updateUser(props.userId, editedFields)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Updated.",
    detail: "The user is updated.",
    life: 3000
  })

  await navigateTo({ name: "admin:users" })
}

async function destroy() {
  deleteUser(props.userId)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Deleted.",
    detail: "The user is deleted.",
    life: 3000
  })

  await navigateTo({ name: "admin:users" })
}
</script>

<style scoped></style>
