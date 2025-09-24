<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    pt:root="w-11/12 max-w-128"
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
            inputId="signin_password"
            placeholder="Password"
            autocomplete="password"
          >
            <!--suppress VueUnrecognizedSlot -->
            <template #maskicon="{ toggleCallback }">
              <Icon
                class="end-3 text-surface-500 dark:text-surface-400 absolute top-1/2 -mt-2 w-4 h-4"
                name="ph:eye-slash-bold"
                @click="toggleCallback"
              />
            </template>

            <!--suppress VueUnrecognizedSlot -->
            <template #unmaskicon="{ toggleCallback }">
              <Icon
                class="end-3 text-surface-500 dark:text-surface-400 absolute top-1/2 -mt-2 w-4 h-4"
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

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const visible = defineModel("visible", { required: true })

const route = useRoute()
const toast = useToast()
const { status, signIn } = useAuth()
const isLoading = computed(() => status.value === "loading")

const resolver = ref(yupResolver(
  yup.object().shape({
    email: yup.string().email("Not a valid email address.").required("Email Address can't be blank."),
    password: yup.string().required("Password can't be blank.")
  })
))

const initialValues = ref({
  email: "",
  password: ""
})

async function onFormSubmit({ valid, values }) {
  if (valid) {
    await signInWithPassword(values)
    closeDialog()
  }
}

async function signInWithPassword(values) {
  try {
    await signIn(values, { redirect: false })

    toast.add({
      severity: "success",
      summary: "Signed In.",
      detail: "You are now signed in.",
      life: 3000
    })
  } catch (error) {
    console.log(error)

    toast.add({
      severity: "error",
      summary: "Not Signed In.",
      detail: error.data?.message || error.message
    })
  }
}

function closeDialog() {
  visible.value = false
}
</script>

<style scoped>

</style>
