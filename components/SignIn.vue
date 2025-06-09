<template>
  <Dialog
    :visible="visible"
    modal
    pt:root="w-11/12 max-w-128"
    :ptOptions="{ mergeProps: ptViewMerge }"
  >
    <template #container>
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        @submit="onFormSubmit"
        class="flex flex-col gap-2 p-5"
      >
        <div class="flex flex-col">
          <label
            for="signin_email"
            class="ml-1 text-primary dark:text-primary text-sm"
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
            required
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
            class="ml-1 text-primary dark:text-primary text-sm"
          >
            Password
          </label>

          <Password
            name="password"
            :feedback="false"
            fluid
            toggleMask
            id="signin_password"
            placeholder="Password"
            autocomplete="password"
            required
          >
            <!--suppress VueUnrecognizedSlot -->
            <template #maskicon="{ toggleCallback }">
              <Icon
                name="ph:eye-slash-bold"
                @click="toggleCallback"
                class="end-3 text-surface-500 dark:text-surface-400 absolute top-1/2 -mt-2 w-4 h-4"
              />
            </template>

            <!--suppress VueUnrecognizedSlot -->
            <template #unmaskicon="{ toggleCallback }">
              <Icon
                name="ph:eye-bold"
                @click="toggleCallback"
                class="end-3 text-surface-500 dark:text-surface-400 absolute top-1/2 -mt-2 w-4 h-4"
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
              name="ph:circle-notch-bold"
              class="animate-spin"
            />
          </template>
        </Button>
      </Form>
    </template>
  </Dialog>
</template>

<script setup>
import { Form } from "@primevue/forms"
// noinspection JSUnresolvedReference
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"

const visible = defineModel("visible", { required: true })

const toast = useToast()
const { status, signIn } = useAuth()
const isLoading = computed(() => status.value === "loading")

const resolver = ref(zodResolver(
  z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." })
  })
))

const initialValues = ref({
  email: "",
  password: ""
})

function onFormSubmit({ valid, values }) {
  if (valid) {
    signInWithPassword(values)
  }
}

async function signInWithPassword(values) {
  try {
    await signIn(values, { redirect: false })
    closeDialog()

    toast.add({
      detail: "You are now signed in.",
      severity: "success"
    })
  } catch (error) {
    console.log(error)

    toast.add({
      detail: error.data?.message || error.message,
      severity: "error",
      closeable: false
    })
  }
}

function closeDialog() {
  visible.value = false
}
</script>

<style scoped>

</style>