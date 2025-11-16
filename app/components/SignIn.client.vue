<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :pt="{ root: 'w-11/12 max-w-128' }"
    :ptOptions="{ mergeProps: ptViewMerge }"
  >
    <template #container>
      <Form
        class="flex flex-col gap-2 p-5"
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        :validateOnValueUpdate="true"
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
    </template>
  </Dialog>
</template>

<script setup>
import { Form } from "@primevue/forms"
// noinspection JSUnresolvedReference
import { yupResolver } from "@primevue/forms/resolvers/yup"
import * as yup from "yup"

const visible = defineModel("visible", { required: true })

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const toast = useToast()
const { signIn } = useAuthClient()

const resolver = ref(
  yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("Not a valid email address.")
        .required("Email Address can't be blank."),
      password: yup.string().required("Password can't be blank.")
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
  const { error } = await signIn.email(values)
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

function closeDialog() {
  visible.value = false
}
</script>

<style scoped></style>
