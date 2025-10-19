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

        <Button @click="updateCharacter">Save</Button>
      </template>

      <template v-else>
        <Button @click="back">Back</Button>

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

const { status, token } = useAuth()
const { destroy, getCharacter, lock, unlock, update } = useCharactersStore()

const detailView = useTemplateRef("detailView")

const originalCharacter = ref(emptyCharacter)
const character = ref(emptyCharacter)
const isSaved = ref(false)
const isBeingEdited = ref(false)

const isSignedIn = computed(() => status.value === "authenticated")

const updatedFields = computed(() =>
  findUpdated(originalCharacter.value, character.value)
)

const isUpdated = computed(() => !_isEmpty(updatedFields.value))

onMounted(async () => await initCharacter())

onBeforeRouteLeave(() => {
  if (isBeingEdited.value) {
    if (isUpdated.value && !isSaved.value && !confirmLeave()) {
      // cancel navigation
      return false
    }
  } else {
    // unlockCharacter()
  }
})

async function initCharacter() {
  originalCharacter.value = await getCharacter(id)
  character.value = _clone(originalCharacter.value)
}

async function editRequest(attribute) {
  // if (!isBeingEdited.value) {
  //   if (isLocked()) {
  //     return
  //   }
  //
  //   await lockCharacter()
  // }

  detailView.value.activate(attribute)
}

async function reset() {
  // await unlockCharacter()
  await initCharacter()

  // reset the trix-editors
  await detailView.value.reset()
}

async function back() {
  // if (isBeingEdited.value) {
  //   await unlockCharacter()
  // }

  navigateTo("/")
}

function isLocked() {
  if (character.value.locked) {
    toast.add({
      severity: "warn",
      summary: "Locked.",
      detail: `This charactrer is being edited by ${character.value.lockedBy}.`
    })
  }

  return character.value.locked
}

async function lockCharacter() {
  const { error } = await lock(character.value.id, token.value)

  if (error) {
    toast.add({
      severity: "danger",
      summary: "Lock Error.",
      detail: error
    })

    return
  }

  isBeingEdited.value = true
}

async function unlockCharacter() {
  const { error } = await unlock(character.value.id, token.value)

  if (error) {
    toast.add({
      severity: "danger",
      summary: "Unlock Error.",
      detail: error
    })

    return
  }

  isBeingEdited.value = false
}

async function updateCharacter() {
  const { data, error } = await update(id, updatedFields.value, token.value)

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

  // await unlockCharacter()
}

async function deleteCharacter() {
  const { data, error } = await destroy(id, token.value)

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
  // if (isLocked()) {
  //   return
  // }

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

    accept: async () => {
      // await unlockCharacter()
      result = true
    },

    reject: () => {
      result = false
    }
  })

  return result
}
</script>

<style scoped></style>
