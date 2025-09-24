<template>
  <DetailCard>
    <template #attribute="{ attribute, type }">
      <Swap
        v-if="type === 'richText'"
        :disabled="!isSignedIn"
        @active="focusTrixEditor(attribute)"
        :ref="(component) => { swaps[attribute] = component }"
      >
        <div
          class="px-3 py-2 border border-transparent trix-content"
          tabindex="0"
          v-html="(character?.[attribute]) || '&nbsp;'"
          @keydown.enter.prevent="open(attribute)"
          @keydown.space.prevent="open(attribute)"
        />

        <template #active="{ close }">
          <TrixEditor
            v-model="character[attribute]"
            :id="attribute"
            tabindex="0"
            @blur="close"
            :ref="(component) => { trixEditors[attribute] = component }"
          />
        </template>
      </Swap>

      <Swap
        v-else-if="type === 'autocomplete'"
        :disabled="!isSignedIn"
        @active="focusInput(attribute)"
        :ref="(component) => { swaps[attribute] = component }"
      >
        <div
          class="px-3 py-2 border border-transparent"
          tabindex="0"
          @keydown.enter.prevent="open(attribute)"
          @keydown.space.prevent="open(attribute)"
        >
          {{ character?.[attribute] || "&nbsp;" }}
        </div>

        <template #active="{ close }">
          <ComboBox
            v-model="character[attribute]"
            :inputId="attribute"
            :suggestions="suggestions[attribute]"
            @blur="onAutoCompleteBlur(close)"
          />
        </template>
      </Swap>

      <Swap
        v-else
        :disabled="!isSignedIn"
        @active="focusInput(attribute)"
        :ref="(component) => { swaps[attribute] = component }"
      >
        <div
          class="px-3 py-2 border border-transparent"
          tabindex="0"
          @keydown.enter.prevent="open(attribute)"
          @keydown.space.prevent="open(attribute)"
        >
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
    </template>

    <template #buttons>
      <template v-if="isUpdated">
        <Button
          severity="warn"
          @click="confirmRevert"
        >
          Revert
        </Button>

        <Button @click="updateCharacter">
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
          v-if="isSignedIn"
          severity="danger"
          @click="confirmDelete"
        >
          Delete
        </Button>
      </template>
    </template>
  </DetailCard>
</template>

<script setup>
const route = useRoute()
const confirm = useConfirm()
const toast = useToast()

const { status, token } = useAuth()
const isSignedIn = computed(() => status.value === "authenticated")

const charactersStore = useCharactersStore()
const { options } = storeToRefs(charactersStore)
const { getCharacter, update, destroy } = charactersStore

const swaps = ref({})
const trixEditors = ref({})

const suggestions = ref(_clone(options.value))
const originalCharacter = ref(emptyCharacter)
const character = ref(emptyCharacter)

const id = computed(() => _toInteger(route.params.id))
const updatedFields = computed(() => findDifferences(originalCharacter.value, character.value))
const isUpdated = computed(() => (!_isEmpty(updatedFields.value)))

onMounted(async () => await initCharacter())

function open(attribute) {
  // noinspection JSUnresolvedReference
  swaps.value[attribute].open()
}

async function focusInput(attribute) {
  // wait for Swap
  await nextTick()

  // set focus to input for the attribute and place cursor after the content (if any)
  const input = document.getElementById(attribute)
  const length = _isNull(character.value?.[attribute]) ? 0 : character.value[attribute].length
  input?.focus()
  input?.setSelectionRange(length, length)
}

async function focusTrixEditor(attribute) {
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

async function reset() {
  // reload character
  await initCharacter()

  // reset the trix-editors
  await nextTick()

  // noinspection JSUnresolvedReference
  _forEach(
    trixEditors.value,
    async (trixEditor) => trixEditor.reset()
  )
}

async function initCharacter() {
  const char = await getCharacter(id.value)

  originalCharacter.value = _clone(char)
  character.value = _clone(char)
}

async function updateCharacter() {
  const { data, error } = await update(id.value, updatedFields.value, token)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Updated.",
      detail: "The character was updated.",
      life: 3000
    })

    navigateTo("/")
  } else {
    toast.add({
      severity: "error",
      summary: "Error.",
      detail: error
    })
  }
}

async function deleteCharacter() {
  const { data, error } = await destroy(id.value, token)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Deleted.",
      detail: "The character was deleted.",
      life: 3000
    })

    navigateTo("/")
  } else {
    toast.add({
      severity: "error",
      summary: "Error.",
      detail: error
    })
  }
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

    accept: () => reset(),

    reject: () => toast.add({
      severity: "info",
      summary: "Cancelled.",
      detail: "Revert cancelled.",
      life: 3000
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
      detail: "Delete cancelled.",
      life: 3000
    })
  })
}
</script>

<style scoped>

</style>
