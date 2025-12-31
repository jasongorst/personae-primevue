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
        for="email"
        class="ml-1 text-sm text-primary dark:text-primary"
      >
        Email Address
      </label>

      <InputText
        name="email"
        fluid
        id="email"
        type="email"
        placeholder="Email address"
        autocomplete="email"
      />

      <Message
        v-if="$form.email?.invalid"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ $form.email?.error?.message }}
      </Message>
    </div>

    <Button
      label="Request Password Reset"
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
      email: z.email("Not an email address.")
    })
  )
)

const initialValues = ref({ email: "" })
const isLoading = ref(false)

async function onFormSubmit({ valid, values }) {
  if (valid) {
    await resetPasswordRequest(values.email)
    closeDialog()
  }
}

async function resetPasswordRequest(email) {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  // noinspection JSUnresolvedReference
  const { error } = await authClient.requestPasswordReset({
    email: email,
    redirectTo: { name: "reset-password" }
  })

  isLoading.value = false

  if (error) {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Request Password Reset Error.",
      detail: error.data?.message || error.message
    })
  } else {
    toast.add({
      severity: "success",
      summary: "Password Reset Requested.",
      detail: "You will receive an email with a link to reset your password.",
      life: 3000
    })
  }
}

function closeDialog() {
  dialogRef.value.close()
}
</script>

<style scoped></style>
