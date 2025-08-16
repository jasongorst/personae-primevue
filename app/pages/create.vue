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

          <TrixEditor
            v-if="type === 'richText'"
            v-model="character[attribute]"
            :id="attribute"
            tabindex="1"
            ref="trixEditors"
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
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row gap-3 justify-end">
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
          :disabled="!isEdited || !isLoggedIn"
          @click="saveCharacter"
        >
          Save
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup>
const confirm = useConfirm()
const toast = useToast()
const trixEditors = useTemplateRef("trixEditors")

const { status, token } = useAuth()
const isLoggedIn = computed(() => status.value === "authenticated")

const charactersStore = useCharactersStore()
const { options } = storeToRefs(charactersStore)
const { create } = charactersStore

const emptyCharacter = _fromPairs(
  _map(apiAttributes, ({ attribute }) => [ attribute, null ])
)

const character = ref(_clone(emptyCharacter))
const suggestions = ref(_clone(options.value))
const isEdited = computed(() => _some(character.value, (value) => isPresent(value)))

async function reset() {
  character.value = _clone(emptyCharacter)

  // reset the trix-editors
  await nextTick()

  _forEach(
    trixEditors.value,
    async (trixEditor) => trixEditor.reset()
  )
}

async function saveCharacter() {
  await create(character.value, token)

  // TODO: add toast, redirect to index
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
      detail: "Reset cancelled."
    })
  })
}
</script>

<style scoped>

</style>
