<template>
  <Form
    class="flex flex-col gap-2 p-5"
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    :validateOnValueUpdate="false"
    :validateOnBlur="true"
    @submit="onFormSubmit"
  >
    <div class="flex flex-col">
      <label
        for="current_password"
        class="ml-1 text-sm text-primary dark:text-primary"
      >
        Current Password
      </label>

      <Password
        name="currentPassword"
        :feedback="false"
        fluid
        toggleMask
        inputId="current_password"
        placeholder="Current password"
        autocomplete="password"
      >
        <!--suppress VueUnrecognizedSlot -->
        <template #maskicon="{ toggleCallback }">
          <Icon
            class="absolute end-3 top-1/2 -mt-2 h-4 w-4 text-surface-500 dark:text-surface-400"
            name="ph:eye-slash-bold"
            @click="toggleCallback"
          />
        </template>

        <!--suppress VueUnrecognizedSlot -->
        <template #unmaskicon="{ toggleCallback }">
          <Icon
            class="absolute end-3 top-1/2 -mt-2 h-4 w-4 text-surface-500 dark:text-surface-400"
            name="ph:eye-bold"
            @click="toggleCallback"
          />
        </template>
      </Password>

      <Message
        v-if="$form.currentPassword?.invalid"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ $form.currentPassword?.error?.message }}
      </Message>
    </div>

    <div class="flex flex-col">
      <label
        for="new_password"
        class="ml-1 text-sm text-primary dark:text-primary"
      >
        New Password
      </label>

      <Password
        name="newPassword"
        :feedback="false"
        fluid
        toggleMask
        inputId="new_password"
        placeholder="New password"
        autocomplete="password"
      >
        <!--suppress VueUnrecognizedSlot -->
        <template #maskicon="{ toggleCallback }">
          <Icon
            class="absolute end-3 top-1/2 -mt-2 h-4 w-4 text-surface-500 dark:text-surface-400"
            name="ph:eye-slash-bold"
            @click="toggleCallback"
          />
        </template>

        <!--suppress VueUnrecognizedSlot -->
        <template #unmaskicon="{ toggleCallback }">
          <Icon
            class="absolute end-3 top-1/2 -mt-2 h-4 w-4 text-surface-500 dark:text-surface-400"
            name="ph:eye-bold"
            @click="toggleCallback"
          />
        </template>
      </Password>

      <Message
        v-if="$form.newPassword?.invalid"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ $form.newPassword?.error?.message }}
      </Message>
    </div>

    <Button
      label="Change Password"
      type="submit"
      fluid
      :disabled="!$form.valid"
      :loading="isLoading"
      class="mt-5"
    >
      <template #loadingicon>
        <Icon
          class="animate-spin"
          name="ph:circle-notch-bold"
        />
      </template>
    </Button>
  </Form>
</template>

<script setup>
// noinspection JSUnresolvedReference
import { zodResolver } from "@primevue/forms/resolvers/zod"
import * as z from "zod"

const dialogRef = inject("dialogRef")
const toast = useToast()
const { authClient } = useAuthClient()

const resolver = ref(
  zodResolver(
    z.object({
      currentPassword: z.string().min(1, "Current password is required."),
      confirmPassword: z
        .string()
        .min(12, "New password must be at least 12 characters.")
    })
  )
)

const initialValues = ref({
  currentPassword: "",
  newPassword: ""
})

const isLoading = ref(false)

async function onFormSubmit({ valid, values }) {
  if (valid) {
    await changePassword(values)
    closeDialog()
  }
}

async function changePassword(values) {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  // noinspection JSUnresolvedReference
  const { error } = await authClient.changePassword(values)

  isLoading.value = false

  if (error) {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Change Password Error.",
      detail: error.data?.message || error.message
    })
  } else {
    toast.add({
      severity: "success",
      summary: "Password Changed.",
      detail: "Your password is changed.",
      life: 3000
    })
  }
}

function closeDialog() {
  dialogRef.value.close()
}
</script>

<style scoped></style>
