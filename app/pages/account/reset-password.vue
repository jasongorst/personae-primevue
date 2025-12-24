<template>
  <div
    class="mx-auto w-11/12 max-w-128 rounded-xl border border-surface-100 bg-surface-200
      text-surface-700 shadow-lg dark:border-surface-800 dark:bg-surface-700
      dark:text-surface-0"
  >
    <Form
      class="flex flex-col gap-2 p-5"
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      :validateOnValueUpdate="['password']"
      :validateOnBlur="true"
      @submit="onFormSubmit"
    >
      <div class="flex flex-col">
        <label
          for="password"
          class="ml-1 text-sm text-primary dark:text-primary"
        >
          Password
        </label>

        <Password
          name="password"
          :feedback="false"
          fluid
          toggleMask
          inputId="password"
          placeholder="Password"
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
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.password?.error?.message }}
        </Message>
      </div>

      <div class="flex flex-col">
        <label
          for="confirm_password"
          class="ml-1 text-sm text-primary dark:text-primary"
        >
          Confirm Password
        </label>

        <Password
          name="confirmPassword"
          :feedback="false"
          fluid
          toggleMask
          inputId="confirm_password"
          placeholder="Confirm password"
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
          v-if="$form.confirmPassword?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.confirmPassword?.error?.message }}
        </Message>
      </div>

      <Button
        label="Reset Password"
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
  </div>
</template>

<script setup>
import { Form } from "@primevue/forms"
// noinspection JSUnresolvedReference
import { zodResolver } from "@primevue/forms/resolvers/zod"
import * as z from "zod"

const { query } = useRoute()
const toast = useToast()
const { authClient } = useAuthClient()

const resolver = ref(
  zodResolver(
    z
      .object({
        password: z
          .string()
          .min(12, "Password must be at least 12 characters."),
        confirmPassword: z.string()
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"]
      })
  )
)

const initialValues = ref({
  password: "",
  confirmPassword: ""
})

const isLoading = ref(false)

async function onFormSubmit({ valid, values }) {
  if (valid) {
    await resetPassword(values.password)
  }
}

async function resetPassword(password) {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  // noinspection JSUnresolvedReference
  const { error } = await authClient.resetPassword({
    newPassword: password,
    token: query.token
  })

  isLoading.value = false

  if (error) {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Password Reset Error.",
      detail: error.data?.message || error.message
    })
  } else {
    toast.add({
      severity: "success",
      summary: "Password Reset.",
      detail: "Your password is reset.",
      life: 3000
    })
  }
}
</script>

<style scoped></style>
