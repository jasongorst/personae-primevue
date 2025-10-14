<template>
  <DetailView
    v-model="character"
    :editable="isSignedIn"
    ref="detailView"
  >
    <template #buttons>
      <template v-if="isUpdated">
        <Button
          severity="warn"
          @click="confirmRevert"
        >
          Revert
        </Button>

        <Button @click="updateCharacter">Save</Button>
      </template>

      <template v-else>
        <Button>
          <NuxtLink to="/">Back</NuxtLink>
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
  </DetailView>
</template>

<script setup>
definePageMeta({
  name: "detail",
  path: "/:id(\\d+)"
})

const route = useRoute()
const id = _toInteger(route.params.id)

const confirm = useConfirm()
const toast = useToast()

const { status, token } = useAuth()
const isSignedIn = computed(() => status.value === "authenticated")

const { getCharacter, update, destroy } = useCharactersStore()

const detailView = useTemplateRef("detailView")

const originalCharacter = ref(emptyCharacter)
const character = ref(emptyCharacter)

const updatedFields = computed(() =>
  findUpdated(originalCharacter.value, character.value)
)

const isUpdated = computed(() => !_isEmpty(updatedFields.value))

onMounted(async () => await initCharacter())

async function initCharacter() {
  originalCharacter.value = await getCharacter(id)
  character.value = _cloneDeep(originalCharacter.value)
}

async function reset() {
  // reload character
  await initCharacter()

  // reset the trix-editors
  await detailView.value.reset()
}

async function updateCharacter() {
  const { data, error } = await update(id, updatedFields.value, token.value)

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
  const { data, error } = await destroy(id, token.value)

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
    message: "Do you want this character deleted?",
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
</script>

<style scoped></style>
