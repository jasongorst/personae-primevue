<template>
  <DetailCard>
    <template #attribute="{ attribute, type }">
      <TrixEditor
        v-if="type === 'richText'"
        v-model="character[attribute]"
        :id="attribute"
        tabindex="1"
        :ref="(component) => { trixEditors[attribute] = component }"
      />

      <ComboBox
        v-else-if="type === 'autocomplete'"
        v-model="character[attribute]"
        :inputId="attribute"
        :suggestions="suggestions[attribute]"
        :tabindex="1"
      />

      <InputText
        v-else
        v-model="character[attribute]"
        :id="attribute"
        fluid
        tabindex="1"
      />
    </template>

    <template #buttons>
      <Button
        v-if="!isEdited"
      >
        <NuxtLink to="/">
          Cancel
        </NuxtLink>
      </Button>

      <Button
        v-else
        severity="warn"
        @click="confirmReset"
      >
        Reset
      </Button>

      <Button
        :disabled="!isEdited"
        @click="saveCharacter"
      >
        Save
      </Button>
    </template>
  </DetailCard>
</template>

<script setup>
const confirm = useConfirm()
const toast = useToast()
const { token } = useAuth()

const charactersStore = useCharactersStore()
const { options } = storeToRefs(charactersStore)
const { create } = charactersStore

const trixEditors = ref({})

const character = ref(_clone(emptyCharacter))
const suggestions = ref(_clone(options.value))
const isEdited = computed(() => _some(character.value, (value) => isPresent(value)))

async function reset() {
  character.value = _clone(emptyCharacter)

  // reset the trix-editors
  await nextTick()

  // noinspection JSUnresolvedReference
  _forEach(
    trixEditors.value,
    async (trixEditor) => trixEditor.reset()
  )
}

async function saveCharacter() {
  const { data, error } = await create(character.value, token)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Saved.",
      detail: "The character was saved.",
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

function confirmReset() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Are you sure you want to reset the form?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Reset",
      severity: "warn"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: () => reset(),

    reject: () => toast.add({
      severity: "info",
      summary: "Cancelled.",
      detail: "Reset cancelled.",
      life: 3000
    })
  })
}
</script>

<style scoped>

</style>
