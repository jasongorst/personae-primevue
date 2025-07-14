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
                @blur="onBlur(close)"
                ref="trixEditors"
              />
            </template>
          </Swap>

          <Swap
            v-else-if="type === 'autocomplete'"
            @active="focusInput(attribute)"
          >
            <div class="px-3 py-2 border border-transparent">
              {{character?.[attribute] || "&nbsp;" }}
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
                @complete="(event) => onComplete(attribute, event)"
                @blur="onBlurAutoComplete(close)"
                @optionSelect="onOptionSelect"
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
                @blur="onBlur(close)"
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
              type="reset"
              severity="warn"
            >
              Cancel
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
const { status, token } = useAuth()
const isLoggedIn = computed(() => status.value === "authenticated")

const trixEditors = useTemplateRef("trixEditors")

const updatedFields = new Set()
const isUpdated = computed(() => isPresent(updatedFields))
const updatedCharacter = computed(() => _pick(character, Array.from(updatedFields)))

const suggestions = ref()
const { data: options } = await useApi("/characters/options", { watch: false })
suggestions.value = _clone(options.value)

async function focusInput(attribute) {
  await nextTick()
  const input = document.getElementById(attribute)
  const length = _isNull(character.value?.[attribute]) ? 0 : character.value[attribute].length

  console.log(input)

  input?.focus()
  input?.setSelectionRange(length, length)
}

async function focusInputTrix(attribute) {
  await nextTick()
  const input = document.getElementById(attribute)
  input.focus()

  await nextTick()
  const length = input.editor.getDocument().getLength()
  input.editor.setSelectedRange(length - 1)
}

function onBlur(close) {
  close()
}

function onBlurAutoComplete(close) {
  console.log("[onBlur]")

  // onBlur(close)
}

function onOptionSelect() {
  console.log("[onOptionSelect]")
}

function onComplete(attribute, { query }) {
  console.log("[onComplete]", attribute, query)

  suggestions.value[attribute] = _filter(
    options.value[attribute],
    (option) => _startsWith(_lowerCase(option), _lowerCase(query))
  )
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
</script>

<style scoped>

</style>
