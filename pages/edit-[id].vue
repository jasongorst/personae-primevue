<template>
  <!--suppress JSValidateTypes -->
  <Form
    v-slot="$form"
    :initialValues="character"
    :resolver="resolver"
    :validateOnValueUpdate="false"
    :validateOnBlur="true"
    @submit="onSubmit"
    @reset="onReset"
    ref="form"
  >
    <Card class="max-w-prose mx-auto">
      <template #content>
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-col"
            v-for="{ attribute, type } in apiAttributes"
            :key="attribute"
          >
            <label
              :for="attribute"
              class="ml-1 text-primary dark:text-primary text-sm"
            >
              {{ _startCase(attribute) }}
            </label>

            <Swap
              v-if="type === 'richText'"
              @active="focusInput(attribute)"
            >
              <div
                class="px-3 py-2 border border-transparent trix-content"
                v-html="$form[attribute]?.value || '&nbsp;'"
              />

              <template #active="{ close }">
                <InputTrix
                  :id="attribute"
                  :name="attribute"
                  @blur="onBlur(attribute, close)"
                  ref="trixEditors"
                />
              </template>
            </Swap>

            <Swap
              v-else
              @active="focusInput(attribute)"
            >
              <div class="px-3 py-2 border border-transparent">
                {{ $form[attribute]?.value || "&nbsp;" }}
              </div>

              <template #active="{ close }">
                <InputText
                  :id="attribute"
                  :name="attribute"
                  fluid
                  @blur="onBlur(attribute, close)"
                />
              </template>
            </Swap>

            <!--suppress JSUnresolvedReference -->
            <Message
              v-if="$form[attribute]?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form[attribute].error.message }}
            </Message>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="mt-4 flex flex-row gap-3 justify-end">
            <template v-if="anyAreDirty">
              <Button
                type="reset"
                severity="warn"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                :disabled="isInvalid || !isLoggedIn"
              >
                Save
              </Button>
            </template>

            <template v-else>
              <Button>
                <NuxtLink to="/">
                  Back
                </NuxtLink>
              </Button>

              <Button
                @click="confirmDelete"
                :disabled="!isLoggedIn"
                severity="danger"
              >
                Delete
              </Button>
            </template>
        </div>
      </template>
    </Card>
  </Form>
</template>

<script setup>
import { Form } from "@primevue/forms"
// noinspection JSUnresolvedReference
import { yupResolver } from "@primevue/forms/resolvers/yup"
import * as yup from "yup"

const route = useRoute()
const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const { status, token } = useAuth()

const form = useTemplateRef("form")
const trixEditors = useTemplateRef("trixEditors")

const isLoggedIn = computed(() => status.value === "authenticated")
const anyAreDirty = computed(() => _some(form.value?.states, "dirty"))
const isInvalid = computed(() => form.value?.invalid)
const editedFields = computed(() => _mapValues(_pickBy(form.value?.states, "dirty"), "value"))

const resolver = ref(yupResolver(
  yup.object().shape({
    faeName: yup.string().nullable(),
    mortalName: yup.string().nullable(),
    player: yup.string().required("Player shouldn't be blank."),
    kith: yup.string().nullable(),
    house: yup.string().nullable(),
    bannerhouse: yup.string().nullable(),
    seeming: yup.string().nullable(),
    rank: yup.string().nullable(),
    location: yup.string().nullable(),
    position: yup.string().nullable(),
    description: yup.string().nullable(),
    notes: yup.string().nullable()
  })
))

async function focusInput(attribute) {
  await nextTick()
  document.getElementById(attribute).focus()
}

async function onBlur(attribute, close) {
  await form.value.validate()

  if (form.value.states[attribute].valid) {
    close()
  }
}

async function onSubmit(event) {
  if (event.valid) {
    await saveCharacter()
    await reloadCharacter()
    await onReset()
  }
}

async function onReset() {
  form.value.reset()
  await nextTick()
  _forEach(trixEditors.value, async (trixEditor) => trixEditor.reset())
  form.value.reset()
}

function confirmDelete() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Are you sure you want this character deleted?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Delete",
      severity: "danger",
    },

    rejectProps: {
      label: "Cancel",
    },

    accept: async () => {
      await deleteCharacter()
    },

    reject: () => {
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Delete cancelled."
      })
    }
  })
}

const { data: character, refresh: reloadCharacter } = await useApi(
  `/characters/${route.params.id}`, {

    onRequestError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "Couldn't load the character. The server cannot be reached."
    }),

    onResponseError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "Couldn't load the character. Something is wrong with the server."
    })
  }
)

// save character
const { execute: saveCharacter } = await useApi(
  `/characters/${route.params.id}`,
  {
    // values of edited attributes
    body: { character: editedFields },
    method: "patch",
    token: token,
    manual: true,

    onRequestError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "The character couldn't be updated. The server cannot be reached."
    }),

    onResponse: () => toast.add({
      severity: "success",
      summary: "Updated.",
      detail: "The character has been updated.",
      life: 4000
    }),

    onResponseError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "The character couldn't be updated. Something is wrong with the server."
    })
  }
)

// delete character
const { execute: deleteCharacter } = await useApi(
  `/characters/${route.params.id}`,
  {
    method: "delete",
    token: token,
    manual: true,

    onRequestError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "The character couldn't be deleted. The server cannot be reached."
    }),

    onResponse: async () => {
      toast.add({
        severity: "success",
        summary: "Deleted.",
        detail: "The character has been deleted.",
        life: 4000
      })

      await router.push("/")
    },

    onResponseError: () => toast.add({
      severity: "error",
      summary: "Sorry.",
      detail: "The character couldn't be deleted. Something is wrong with the server."
    })
  }
)
</script>

<style scoped>

</style>
