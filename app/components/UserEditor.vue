<template>
  <div>{{ updatedFields }}</div>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          v-for="{ attribute, type } in userAttributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <label
            :for="attribute"
            class="ml-1 cursor-pointer text-sm text-primary dark:text-primary"
          >
            {{ _startCase(attribute) }}
          </label>

          <Swap @active="focusFormControl({ attribute, type })">
            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content cursor-pointer border border-transparent px-3 py-2 group-hover:bg-primary/15"
                :tabindex="0"
                v-html="user[attribute] || '&nbsp;'"
              />

              <div
                v-else
                class="cursor-pointer border border-transparent px-3 py-2 group-hover:bg-primary/15"
                :tabindex="0"
              >
                {{ user[attribute] || "&nbsp;" }}
              </div>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                v-model="user[attribute]"
                :id="attribute"
                :tabindex="0"
                @blur="deactivate"
                :ref="(trixEditor) => (trixEditors[attribute] = trixEditor)"
              />

              <ComboBox
                v-else-if="type === 'autocomplete'"
                v-model="user[attribute]"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                @blur="onAutoCompleteBlur(deactivate)"
              />

              <InputText
                v-else
                v-model="user[attribute]"
                :id="attribute"
                :tabindex="0"
                fluid
                @blur="deactivate"
              />
            </template>
          </Swap>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <template v-if="isUpdated">
          <Button
            severity="warn"
            @click="confirmReset"
          >
            Reset
          </Button>

          <Button @click="saveUser">Save</Button>
        </template>

        <template v-else>
          <Button>
            <!--suppress HtmlUnknownTarget -->
            <NuxtLink :to="{ name: 'admin:users' }">Back</NuxtLink>
          </Button>

          <Button
            v-if="props.action === 'edit'"
            severity="danger"
            @click="confirmDelete"
          >
            Delete
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
const trixEditors = ref({})

// noinspection JSCheckFunctionSignatures
const props = defineProps({
  action: {
    type: String,
    default: "edit",
    validator: (value) => _includes(["create", "edit"], value)
  },

  id: {
    type: String,
    validator: (value, props) =>
      props.action !== "edit" || (_isString(value) && !_isEmpty(value))
  }
})

const {
  $socketio: { socket }
} = useNuxtApp()

const confirm = useConfirm()
const toast = useToast()
const { authClient } = useAuthClient()

const userAttributes = computed(() => {
  let attr = [
    { attribute: "name", type: "text" },
    { attribute: "email", type: "text" },
    { attribute: "username", type: "text" },
    { attribute: "password", type: "text" },
    { attribute: "role", type: "autocomplete" }
  ]

  if (props.action === "edit") {
    attr = _concat(attr, [
      { attribute: "banned", type: "autocomplete" },
      { attribute: "banReason", type: "text" },
      { attribute: "banExpires", type: "text" }
    ])
  }

  return attr
})

const userAttributesList = computed(() =>
  _map(userAttributes.value, ({ attribute }) => attribute)
)

async function getUser(id) {
  const { data: response } = await useAsyncData(
    `user:read:${id}`,
    async () => {
      const { data: response } = await socket
        .timeout(3000)
        .emitWithAck("user:read", id)
      return response
    },
    { transform: deepParseTimestamps }
  )

  // add empty password
  response.value.password = ""
  return response.value
}

const initialValue =
  props.action === "create"
    ? mapObject(userAttributesList.value, () => "")
    : await getUser(props.id)

const {
  model: user,
  updatedFields,
  isUpdated,
  revert
} = useEditor(initialValue)

const options = ref({
  role: ["user", "admin"],
  banned: ["true", "false"]
})

const isSaved = ref(false)
const suggestions = ref(_clone(options.value))

onBeforeRouteLeave(async () => {
  if (isUpdated.value && !isSaved.value && !(await confirmLeave())) {
    return false
  }
})

async function focusFormControl({ attribute, type }) {
  // wait for Swap
  await nextTick()

  const control = document.getElementById(attribute)
  control.focus()

  if (type === "richText") {
    // wait for editor
    await nextTick()

    // place cursor at end of editor content
    const length = control.editor.getDocument().getLength()
    control.editor.setSelectedRange(length - 1)
  } else if (_includes(["text", "autocomplete"], type)) {
    // place cursor at end of input content
    // noinspection JSUnresolvedReference
    const length = _isNull(user.value[attribute])
      ? 0
      : user.value[attribute].length
    control.setSelectionRange(length, length)
  }
}

async function onAutoCompleteBlur(deactivate) {
  // wait for animation to complete
  await sleep(200)
  deactivate()
}

async function reset() {
  revert()
  await nextTick()

  _forEach(_filter(schemaAttributes, { type: "richText" }), ({ attribute }) => {
    // noinspection JSUnresolvedReference
    trixEditors.value[attribute].reset()
  })
}

async function saveUser() {
  console.log("[saveUser]")

  if (props.action === "create") {
    await createUser()
  } else {
    await updateUser()
  }
}

async function createUser() {
  try {
    await socket.timeout(3000).emitWithAck("user:create", user.value)
  } catch (error) {
    console.log(error)

    toast.add({
      severity: "error",
      summary: "Create Error.",
      detail: error.message
    })
  }

  toast.add({
    severity: "success",
    summary: "Saved.",
    detail: "The user is saved.",
    life: 3000
  })

  isSaved.value = true
  await navigateTo({ name: "admin:users" })
}

async function updateUser() {
  console.log("[updateUser]", props.id, user.value)

  try {
    await socket.timeout(3000).emitWithAck("user:update", props.id, updatedFields.value)
  } catch (error) {
    console.log(error)

    toast.add({
      severity: "error",
      summary: "Update Error.",
      detail: error.message
    })
  }

  toast.add({
    severity: "success",
    summary: "Updated.",
    detail: "The user is updated.",
    life: 3000
  })

  isSaved.value = true
  await navigateTo({ name: "admin:users" })
}

async function deleteUser() {
  try {
    await socket.timeout(3000).emitWithAck("user:delete", props.id)
  } catch (error) {
    console.log(error)

    toast.add({
      severity: "error",
      summary: "Delete Error.",
      detail: error.message
    })
  }

  toast.add({
    severity: "success",
    summary: "Deleted.",
    detail: "The user is deleted.",
    life: 3000
  })

  isSaved.value = true
  await navigateTo({ name: "admin:users" })
}

function confirmDelete() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Do you want to delete this user?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Delete",
      severity: "danger"
    },

    rejectProps: { label: "Cancel" },
    accept: async () => await deleteUser(),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Delete cancelled.",
        life: 3000
      })
  })
}

function confirmReset() {
  // noinspection JSUnusedGlobalSymbols
  const confirmOptions = {
    header: "Reset?",
    icon: "ph:warning-bold",
    message: "Do you want to reset this user?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Reset",
      severity: "warn"
    },

    rejectProps: { label: "Cancel" },
    accept: async () => await reset(),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Reset cancelled.",
        life: 3000
      })
  }

  if (props.action === "create") {
    _assign(confirmOptions, {
      header: "Revert?",
      message: "Do you want to revert your edits?",

      acceptProps: {
        label: "Revert",
        severity: "warn"
      },

      reject: () =>
        toast.add({
          severity: "info",
          summary: "Cancelled.",
          detail: "Revert cancelled.",
          life: 3000
        })
    })
  }

  confirm.require(confirmOptions)
}

async function confirmLeave() {
  const modal = new Promise((resolve) => {
    // noinspection JSUnusedGlobalSymbols
    const confirmOptions = {
      header: "Leave?",
      icon: "ph:warning-bold",
      message: "Do you want to abandon this user?",
      defaultFocus: "reject",

      acceptProps: {
        label: "Leave",
        severity: "danger"
      },

      rejectProps: { label: "Cancel" },

      accept: () => resolve(true),
      reject: () => resolve(false)
    }

    if (props.action === "create") {
      _assign(confirmOptions, {
        message: "Do you want to abandon your edits?"
      })
    }

    confirm.require(confirmOptions)
  })

  return await modal
}
</script>

<style scoped></style>
