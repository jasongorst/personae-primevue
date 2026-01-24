<!--suppress VueUnrecognizedSlot -->
<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <Form
        id="userForm"
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        :validateOnSubmit="true"
        class="flex flex-col gap-2"
        @submit="onFormSubmit"
        ref="form"
      >
        <div
          v-for="({ type }, attribute) in userAttributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <Swap @active="focusFormControl({ attribute, type })">
            <template #default>
              <label
                :for="attribute"
                class="ml-1 block cursor-pointer text-sm text-primary dark:text-primary"
              >
                {{ _startCase(attribute) }}
              </label>
            </template>

            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content cursor-pointer border border-transparent px-3 py-2
                  group-hover:bg-primary/15"
                :tabindex="0"
                v-html="
                  isEmptyOrWhitespace(form?.states[attribute]?.value)
                    ? '&nbsp;'
                    : form?.states[attribute]?.value
                "
              />

              <div
                v-else
                class="cursor-pointer border border-transparent px-3 py-2 group-hover:bg-primary/15"
                :tabindex="0"
              >
                {{
                  isEmptyOrWhitespace(form?.states[attribute]?.value)
                    ? "&nbsp;"
                    : form?.states[attribute]?.value
                }}
              </div>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                :name="attribute"
                :id="attribute"
                :tabindex="0"
                @blur="waitForAnimation(deactivate)"
                :ref="(trixEditor) => (trixEditors[attribute] = trixEditor)"
              />

              <Select
                v-else-if="type === 'select'"
                :name="attribute"
                :tabindex="0"
                :labelId="attribute"
                fluid
                :options="options[attribute]"
                @blur="waitForAnimation(deactivate)"
                :ref="(select) => (selects[attribute] = select)"
              />

              <ComboBox
                v-else-if="type === 'autocomplete'"
                :name="attribute"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                @blur="waitForAnimation(deactivate)"
              />

              <InputText
                v-else
                :name="attribute"
                :id="attribute"
                :tabindex="0"
                fluid
                @blur="waitForAnimation(deactivate)"
              />
            </template>
          </Swap>

          <Message
            v-if="form?.states[attribute]?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ form?.states[attribute].error?.message }}
          </Message>
        </div>
      </Form>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <template v-if="isEdited">
          <Button
            severity="warn"
            @click="confirmReset"
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="userForm"
            :disabled="!form.valid"
          >
            Save
          </Button>
        </template>

        <template v-else>
          <Button
            v-if="props.action === 'edit'"
            severity="danger"
            @click="confirmDelete"
          >
            Delete
          </Button>

          <Button>
            <!--suppress HtmlUnknownTarget -->
            <NuxtLink :to="{ name: 'admin:users' }"> Back </NuxtLink>
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
// noinspection JSUnresolvedReference
import { zodResolver } from "@primevue/forms/resolvers/zod"

const form = useTemplateRef("form")
const selects = ref({})
const trixEditors = ref({})

// noinspection JSCheckFunctionSignatures
const props = defineProps({
  action: {
    type: String,
    default: "edit",
    validator: (value) => _includes(["create", "edit"], value)
  },

  userId: {
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

const resolver = ref((opts) => {
  if (props.action === "create") {
    return zodResolver(createUserSchema)(opts)
  } else {
    return zodResolver(updateUserSchema)(opts)
  }
})

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

const initialValues =
  props.action === "create" ? emptyUser : await getUser(props.userId)

const options = _mapValues(userAttributes, "options")

const isEdited = computed(() =>
  isUpdated(initialValues, _mapValues(form.value?.states, "value"))
)

const hasErrors = computed(
  () => !form.value?.valid || _some(form.value?.states, "invalid")
)

const isSaved = ref(false)
const suggestions = ref(_clone(options.value))

onBeforeRouteLeave(async () => {
  if (isEdited.value && !isSaved.value && !(await confirmLeave())) {
    return false
  }
})

async function focusFormControl({ attribute, type }) {
  await nextTick()
  const control = document.getElementById(attribute)
  control.focus()

  switch (type) {
    case "select": {
      // noinspection JSUnresolvedReference
      selects.value[attribute].show()
      break
    }

    case "richText": {
      await nextTick()
      const length = control.editor.getDocument().getLength()
      control.editor.setSelectedRange(length - 1)
      break
    }

    default: {
      // noinspection JSUnresolvedReference
      const length = _isNull(form.value?.states[attribute].value)
        ? 0
        : form.value?.states[attribute].value.length
      control.setSelectionRange(length, length)
    }
  }
}

async function waitForAnimation(deactivate) {
  await callAfterDelay(deactivate, 200)
}

async function reset() {
  form.value.reset()
  await nextTick()

  _forEach(_filter(userAttributes, { type: "richText" }), ({ attribute }) => {
    // noinspection JSUnresolvedReference
    trixEditors.value[attribute].reset()
  })
}

async function onFormSubmit({ valid, values }) {
  if (valid) {
    if (props.action === "create") {
      await createUser(values)
    } else {
      await updateUser(findUpdated(initialValues, values))
    }
  }
}

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
