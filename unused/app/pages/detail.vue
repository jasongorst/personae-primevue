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
            @click="confirmRevert"
          >
            Revert
          </Button>

          <Button @click="saveCharacter">Save</Button>
        </template>

        <template v-else>
          <Button>
            <NuxtLink to="/public">Back</NuxtLink>
          </Button>

          <Button
            severity="danger"
            @click="confirmDelete"
          >
            Delete
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
// definePageMeta({
//   name: "detail",
//   path: "/:id(\\d+)"
// })

const id = _toInteger(useRoute().params?.id)

const trixEditors = ref({})
const confirm = useConfirm()
const toast = useToast()

const charactersStore = await useCharactersStore()
const { destroy, getCharacter, update } = charactersStore
const { options } = storeToRefs(charactersStore)

const {
  model: character,
  updatedFields,
  isUpdated,
  revert
} = useEditor(await getCharacter(id))

const isSaved = ref(false)
const suggestions = ref(_clone(options.value))

onBeforeRouteLeave(async() => {
  if (isUpdated.value && !isSaved.value && !(await confirmLeave())) {
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
    // noinspection JSUnresolvedReference
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
  const { data, error } = await update(id, updatedFields.value)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Updated.",
      detail: "The character is updated.",
      life: 3000
    })

    isSaved.value = true
    navigateTo("/")
  } else {
    toast.add({
      severity: "error",
      summary: "Update Error.",
      detail: error
    })
  }
}

async function deleteCharacter() {
  const { data, error } = await destroy(id)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Deleted.",
      detail: "The character is deleted.",
      life: 3000
    })

    isSaved.value = true
    navigateTo("/")
  } else {
    toast.add({
      severity: "error",
      summary: "Delete Error.",
      detail: error
    })
  }
}

function confirmRevert() {
  confirm.require({
    header: "Revert?",
    icon: "ph:warning-bold",
    message: "Do you want to revert your edits?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Revert",
      severity: "warn"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: async () => await reset(),

    reject: () =>
      toast.add({
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
    message: "Do you want to delete this character?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Delete",
      severity: "danger"
    },

    rejectProps: {
      label: "Cancel"
    },

    accept: async () => await deleteCharacter(),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Delete cancelled.",
        life: 3000
      })
  })
}

async function confirmLeave() {
  const modal = new Promise((resolve) => {
    confirm.require({
      header: "Leave?",
      icon: "ph:warning-bold",
      message: "Do you want to abandon your edits?",
      defaultFocus: "reject",

      acceptProps: {
        label: "Leave",
        severity: "danger"
      },

      rejectProps: {
        label: "Cancel"
      },

      accept: () => resolve(true),
      reject: () => resolve(false)
    })
  })

  return await modal
}
</script>

<style scoped></style>
