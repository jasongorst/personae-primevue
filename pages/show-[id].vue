<template>
  <Form
    v-slot="$form"
    :initialValues="character"
    :resolver="resolver"
    :validateOnValueUpdate="false"
    :validateOnBlur="true"
    @submit="onSubmit"
    ref="form"
  >
    <Card class="max-w-prose mx-auto">
      <template #content>
        <!--suppress JSValidateTypes -->
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

            <Swap @active="focusInput(attribute)">
<!--              <div-->
<!--                v-if="type === 'richText'"-->
<!--                class="prose trix-content"-->
<!--                v-html="character[attribute] || '&nbsp;'"-->
<!--              />-->

              <div
                class="px-3 py-2 border border-transparent"
              >
                {{ $form[attribute]?.value || "&nbsp;" }}
              </div>

              <template #active="{ close }">
<!--                <Editor-->
<!--                  v-if="type === 'richText'"-->
<!--                  :id="attribute"-->
<!--                  v-model="character[attribute]"-->
<!--                  :unstyled="false"-->
<!--                  fluid-->
<!--                  @input="setEdited"-->
<!--                  @blur="close"-->
<!--                >-->
<!--                  <template #toolbar>-->
<!--                    <span class="ql-formats">-->
<!--                      <button class="ql-bold" />-->
<!--                      <button class="ql-italic" />-->
<!--                      <button class="ql-underline" />-->
<!--                      <button class="ql-strike" />-->
<!--                    </span>-->

<!--                    <span class="ql-formats">-->
<!--                      <button class="ql-blockquote" />-->
<!--                      <button class="ql-link" />-->
<!--                      <button class="ql-image" />-->
<!--                    </span>-->
<!--                  </template>-->
<!--                </Editor>-->

                <InputText
                  :id="attribute"
                  :name="attribute"
                  fluid
                  @blur="updateField(attribute, close)"
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
            <template v-if="dirty">
              <Button
                severity="warn"
                @click="form.reset()"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                :disabled="invalid || !isLoggedIn"
              >
                Save
              </Button>
            </template>

            <template v-else>
              <Button
                @click="router.back()"
              >
                Back
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
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"

const route = useRoute()
const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const { status, token } = useAuth()
const form = useTemplateRef("form")

const isLoggedIn = computed(() => status.value === "authenticated")
const touched = computed(() => _some(form.value?.states, "touched"))
const dirty = computed(() => _some(form.value?.states, "dirty"))
const invalid = computed(() => form.value?.invalid)
const edited = computed(() => _mapValues(_pickBy(form.value?.states, "dirty"), "value"))

const resolver = ref(zodResolver(
  z.object({
    faeName: z.string().nullable(),
    mortalName: z.string().nullable(),
    player: z.string(),
    kith: z.string().nullable(),
    house: z.string().nullable(),
    bannerhouse: z.string().nullable(),
    seeming: z.enum([ "Childling", "Grump", "Wilder" ]).nullable(),
    rank: z.string().nullable(),
    location: z.string().nullable(),
    position: z.string().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable()
  })
))

const { data: character, refresh: loadCharacter, status: loadingStatus } = await useApi(
  `/characters/${route.params.id}`, {

    onRequestError: () => toast.add({
      severity: "error",
      detail: "Couldn't load characters. The server cannot be reached."
    }),

    onResponseError: () => toast.add({
      severity: "error",
      detail: "Couldn't load characters. Something is wrong with the server."
    })
  }
)

// save character
const { execute: saveCharacter, status: savingStatus } = await useApi(
  `/characters/${route.params.id}`,
  {
    // values of edited attributes
    body: { character: edited },
    method: "patch",
    token: token,
    manual: true,

    onRequestError: () => toast.add({
      severity: "error",
      detail: "The character couldn't be updated. The server cannot be reached."
    }),

    onResponse: () => toast.add({
      severity: "success",
      detail: "The character has been updated.",
      life: 4000
    }),

    onResponseError: () => toast.add({
      severity: "error",
      detail: "The character couldn't be updated. Something is wrong with the server."
    })
  }
)

// delete character
const { execute: deleteCharacter, status: deletingStatus } = await useApi(
  `/characters/${route.params.id}`,
  {
    method: "delete",
    token: token,
    manual: true,

    onRequestError: () => toast.add({
      severity: "error",
      detail: "The character couldn't be deleted. The server cannot be reached."
    }),

    onResponse: async () => {
      toast.add({
        severity: "success",
        detail: "The character has been deleted.",
        life: 4000
      })

      await router.push("/")
    },

    onResponseError: () => toast.add({
      severity: "error",
      detail: "The character couldn't be deleted. Something is wrong with the server."
    })
  }
)

async function focusInput(attribute) {
  await nextTick()
  document.getElementById(attribute).focus()
}

async function updateField(attribute, close) {
  await form.value.validate()

  if (form.value.states[attribute].valid) {
    close()
  }
}

async function onSubmit(event) {
  if (event.valid) {
    await saveCharacter()
  }
}

function confirmDelete(event) {
  confirm.require({
    header: "Deleted!",
    message: "really?",
    defaultFocus: "reject",
    rejectProps: {
      label: "Cancel",
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {},
    reject: () => {}
  })
}
</script>

<style scoped>

</style>
