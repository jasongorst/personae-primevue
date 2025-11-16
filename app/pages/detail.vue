<template>
  <DetailView
    v-model="character"
    :editable="isSignedIn"
    @editRequest="editRequest"
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

        <Button @click="saveCharacter">Save</Button>
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

const id = _toInteger(useRoute().params?.id)
const confirm = useConfirm()
const toast = useToast()
const { isSignedIn } = useAuthClient()

const { destroy, getCharacter, update } = useCharactersStore()

const detailView = useTemplateRef("detailView")

const character = ref(await getCharacter(id))
const originalCharacter = ref({})
const beingEdited = ref(false)

const updatedFields = computed(() => {
  if (beingEdited.value) {
    return findUpdated(originalCharacter.value, character.value)
  } else {
    return {}
  }
})

const isUpdated = computed(() => !_isEmpty(updatedFields.value))

onBeforeRouteLeave(() => {
  if (isUpdated.value && !confirmLeave()) {
    return false
  }
})

async function editRequest(attribute) {
  if (!beingEdited.value) {
    originalCharacter.value = await getCharacter(id)
    character.value = _clone(originalCharacter.value)
    beingEdited.value = true
  }

  detailView.value.activate(attribute)
}

async function resetCharacter() {
  originalCharacter.value = {}
  character.value = await getCharacter(id)
  beingEdited.value = false

  // reset the trix-editors
  await detailView.value.reset()
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

    beingEdited.value = false
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

    beingEdited.value = false
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

    accept: async () => await resetCharacter(),

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

function confirmLeave() {
  let result

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

    accept: () => (result = true),
    reject: () => (result = false)
  })

  return result
}
</script>

<style scoped></style>
