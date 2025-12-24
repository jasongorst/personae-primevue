<template>
  <div>
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
          for="signin_email"
          class="ml-1 text-sm text-primary dark:text-primary"
        >
          Email Address
        </label>

        <InputText
          name="email"
          fluid
          id="signin_email"
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

      <div class="flex flex-col">
        <label
          for="signin_password"
          class="ml-1 text-sm text-primary dark:text-primary"
        >
          Password
        </label>

        <Password
          name="password"
          :feedback="false"
          fluid
          toggleMask
          inputId="signin_password"
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

      <Button
        label="Sign In"
        type="submit"
        fluid
        :disabled="!$form.valid"
        :loading="isLoading"
        class="mt-5"
      >
        <template #icon>
          <Icon name="ph:sign-in-bold" />
        </template>

        <template #loadingicon>
          <Icon
            class="animate-spin"
            name="ph:circle-notch-bold"
          />
        </template>
      </Button>
    </Form>

    <div class="flex flex-col p-5 pt-0">
      <Button
        variant="text"
        @click="resetPasswordRequest()"
      >
        Forgot Password
      </Button>
    </div>
  </div>
</template>

<script setup>
const ResetPasswordRequestDialog = defineLazyHydrationComponent(
  "visible",
  () => import("~/components/ResetPasswordRequestDialog.vue")
)

// noinspection JSUnresolvedReference
import { zodResolver } from "@primevue/forms/resolvers/zod"
import * as z from "zod"

const dialog = useDialog()
const dialogRef = inject("dialogRef")
const toast = useToast()
const { signIn } = useAuthClient()

const resolver = ref(
  zodResolver(
    z.object({
      email: z.email("Not an email address."),
      password: z.string().min(1, "Password is required.")
    })
  )
)

const initialValues = ref({
  email: "",
  password: ""
})

const isLoading = ref(false)

async function onFormSubmit({ valid, values }) {
  if (valid) {
    await signInWithPassword(values)
    closeDialog()
  }
}

async function signInWithPassword(values) {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  const { error } = await signIn(values)
  isLoading.value = false

  if (error) {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "SignIn Error.",
      detail: error.data?.message || error.message
    })
  } else {
    toast.add({
      severity: "success",
      summary: "Signed In.",
      detail: "You are now signed in.",
      life: 3000
    })
  }
}

async function resetPasswordRequest() {
  closeDialog()
  showResetPasswordRequestDialog()
}

function showResetPasswordRequestDialog() {
  dialog.open(ResetPasswordRequestDialog, {
    props: {
      modal: true,
      dismissableMask: true,
      showHeader: false,
      pt: {
        root: "z-90 w-11/12 max-w-128",
        content: "p-0"
      },
      ptOptions: { mergeProps: ptViewMerge }
    }
  })
}

function closeDialog() {
  dialogRef.value.close()
}
</script>

<style scoped></style>
