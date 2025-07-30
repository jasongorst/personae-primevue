<template>
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
            @active="focusInputTrix(attribute)"
          >
            <div
              class="px-3 py-2 border border-transparent trix-content"
              v-html="(character?.[attribute]) || '&nbsp;'"
            />

            <template #active="{ close }">
              <InputTrix
                v-model="character[attribute]"
                :id="attribute"
                @blur="close"
                ref="trixEditors"
              />
            </template>
          </Swap>

          <Swap
            v-else-if="type === 'autocomplete'"
            @active="focusInput(attribute)"
          >
            <div class="px-3 py-2 border border-transparent">
              {{ character?.[attribute] || "&nbsp;" }}
            </div>

            <template #active="{ close }">
              <ComboBox
                v-model="character[attribute]"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                :minLength="0"
                :showEmptyMessage="false"
                :completeOnFocus="true"
                fluid
                @complete="(event) => complete(attribute, event)"
                @blur="onAutoCompleteBlur(close)"
              />
            </template>
          </Swap>

          <Swap
            v-else
            @active="focusInput(attribute)"
          >
            <div class="px-3 py-2 border border-transparent">
              {{ character?.[attribute] || "&nbsp;" }}
            </div>

            <template #active="{ close }">
              <InputText
                v-model="character[attribute]"
                :id="attribute"
                fluid
                @blur="close"
              />
            </template>
          </Swap>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row gap-3 justify-end">
        <template v-if="isUpdated">
          <Button
            @click="confirmRevert"
            severity="warn"
          >
            Revert
          </Button>

          <Button
            type="submit"
            :disabled="!isLoggedIn"
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
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const charactersStore = useCharactersStore()
const trixEditors = useTemplateRef("trixEditors")

const { status, token } = useAuth()
const isLoggedIn = computed(() => status.value === "authenticated")

const suggestions = ref(_clone(charactersStore.options))
const originalCharacter = ref(null)
const character = ref(null)

const updatedFields = computed(() => nonMatchingProperties(originalCharacter.value, character.value))
const isUpdated = computed(() => isPresent(updatedFields.value))

callOnce(() => loadCharacter())

async function focusInput(attribute) {
  // wait for Swap
  await nextTick()

  // set focus to input for the attribute and place cursor after the content (if any)
  const input = document.getElementById(attribute)
  const length = _isNull(character.value?.[attribute]) ? 0 : character.value[attribute].length
  input?.focus()
  input?.setSelectionRange(length, length)
}

async function focusInputTrix(attribute) {
  // wait for Swap
  await nextTick()

  // set focus to input of trix-editor for the attribute
  const input = document.getElementById(attribute)
  input.focus()

  // wait again
  await nextTick()

  // place cursor at the end of trix-editor
  const length = input.editor.getDocument().getLength()
  input.editor.setSelectedRange(length - 1)
}

async function onAutoCompleteBlur(close) {
  // wait for autoComplete animation to complete before closing
  await sleep(200)
  close()
}

function complete(attribute, { query }) {
  // suggestions shows options starting with current input content (ignoring case)
  suggestions.value[attribute] = _filter(
    charactersStore.options[attribute],
    (option) => _startsWith(_lowerCase(option), _lowerCase(query))
  )
}

async function submit(event) {
  if (event.valid) {
    await saveCharacter()

    // TODO: either directly update charactersStore data, or wait for the patch
    //   to come over websockets and then maybe verify the change?

    // reloadCharacter()
    // await onReset()
  }
}

async function reset() {
  // reset the form
  // noinspection JSUnresolvedReference
  form.value.reset()

  // reset the trix-editors
  await nextTick()
  _forEach(trixEditors.value, async (trixEditor) => trixEditor.reset())

  // reset the form again (?)
  // noinspection JSUnresolvedReference
  form.value.reset()

  // TODO: figure out why I needed to reset the form twice
}

function loadCharacter() {
  originalCharacter.value = _clone(charactersStore.data[route.params.id])
  character.value = _clone(originalCharacter.value)
}

function confirmRevert() {
  confirm.require({
    header: "Revert?",
    icon: "ph:warning-bold",
    message: "Do you want to revert the edits you made?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Revert",
      severity: "warn"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: () => {
      reset()
      loadCharacter()
    },

    reject: () => toast.add({
      severity: "info",
      summary: "Cancelled.",
      detail: "Revert cancelled."
    })
  })
}

function confirmDelete() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Are you sure you want this character deleted?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Delete",
      severity: "danger"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: async () => await deleteCharacter(),

    reject: () => toast.add({
      severity: "info",
      summary: "Cancelled.",
      detail: "Delete cancelled."
    })
  })
}

// save character
const { execute: saveCharacter } = await useApi(
  `/characters/${route.params.id}`,
  {
    // values of edited attributes
    body: { character: updatedFields },
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

function nonMatchingProperties(source, target) {
  return _compact(
    _map(
      toValue(source),
      (value, key) => _isEqual(value, toValue(target)?.[key]) ? null : key
    )
  )
}
</script>

<style scoped>

</style>
