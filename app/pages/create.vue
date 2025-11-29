<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          v-for="{ attribute, type } in schemaAttributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <label
            :for="attribute"
            class="ml-1 text-sm text-primary dark:text-primary cursor-pointer"
          >
            {{ _startCase(attribute) }}
          </label>

          <Swap @active="focusFormControl({ attribute, type })">
            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content border border-transparent px-3 py-2 cursor-pointer group-hover:bg-primary/15"
                :tabindex="0"
                v-html="character[attribute] || '&nbsp;'"
              />

              <div
                v-else
                class="border border-transparent px-3 py-2 cursor-pointer group-hover:bg-primary/15"
                :tabindex="0"
              >
                {{ character[attribute] || "&nbsp;" }}
              </div>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                v-model="character[attribute]"
                :id="attribute"
                :tabindex="0"
                @blur="deactivate"
                :ref="(trixEditor) => (trixEditors[attribute] = trixEditor)"
              />

              <ComboBox
                v-else-if="type === 'autocomplete'"
                v-model="character[attribute]"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                @blur="onAutoCompleteBlur(deactivate)"
              />

              <InputText
                v-else
                v-model="character[attribute]"
                :id="attribute"
                :tabindex="0"
                fluid
                @blur="deactivate"
              />
            </template>
          </Swap>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <template v-if="isUpdated">
          <Button
            severity="warn"
            @click="confirmReset"
          >
            Reset
          </Button>

          <Button @click="saveCharacter">Save</Button>
        </template>

        <template v-else>
          <Button>
            <NuxtLink to="/">Back</NuxtLink>
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
definePageMeta({ middleware: "user" })

const trixEditors = ref({})

const confirm = useConfirm()
const toast = useToast()

const charactersStore = await useCharactersStore()
const { create } = charactersStore
const { options } = storeToRefs(charactersStore)

const {
  model: character,
  isUpdated,
  revert
} = useEditor(emptyCharacter)

const isSaved = ref(false)
const suggestions = ref(_clone(options.value))

onBeforeRouteLeave(() => {
  if (isUpdated.value && !isSaved.value && !confirmLeave()) {
    return false
  }
})

async function focusFormControl({ attribute, type }) {
  // wait for Swap
  await nextTick()

  const control = document.getElementById(attribute)
  control.focus()

  if (type === "richText") {
    // wait for editor
    await nextTick()

    // place cursor at end of editor content
    const length = control.editor.getDocument().getLength()
    control.editor.setSelectedRange(length - 1)
  } else if (_includes(["text", "autocomplete"], type)) {
    // place cursor at end of input content
    const length = _isNull(character.value[attribute]) ? 0 : character.value[attribute].length
    control.setSelectionRange(length, length)
  }
}

async function onAutoCompleteBlur(deactivate) {
  // wait for animation to complete
  await sleep(200)
  deactivate()
}

async function reset() {
  revert()
  await nextTick()

  _forEach(
    _filter(schemaAttributes, { type: "richText"} ),
    ({ attribute }) => {
      // noinspection JSUnresolvedReference
      trixEditors.value[attribute].reset()
    }
  )
}

async function saveCharacter() {
  const { data, error } = await create(character.value)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Saved.",
      detail: "The character is saved.",
      life: 3000
    })

    isSaved.value = true
    navigateTo("/")
  } else {
    toast.add({
      severity: "error",
      summary: "Create Error.",
      detail: error
    })
  }
}

function confirmReset() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Do you want to reset this character?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Reset",
      severity: "warn"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: () => reset(),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Reset cancelled.",
        life: 3000
      })
  })
}

function confirmLeave() {
  let result

  confirm.require({
    header: "Leave?",
    icon: "ph:warning-bold",
    message: "Do you want to abandon this character?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Leave",
      severity: "danger"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: () => (result = true),
    reject: () => (result = false)
  })

  return result
}
</script>

<style scoped></style>
