<template>
  <DetailView
    v-model="character"
    @editRequest="editRequest"
    ref="detailView"
  >
    <template #buttons>
      <Button v-if="!isEdited">
        <NuxtLink to="/">Cancel</NuxtLink>
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
  </DetailView>
</template>

<script setup>
definePageMeta({ middleware: "user" })

const confirm = useConfirm()
const toast = useToast()
const { create } = useCharactersStore()
const detailView = useTemplateRef("detailView")

const character = ref(_cloneDeep(emptyCharacter))
const isSaved = ref(false)

const isEdited = computed(() =>
  _some(character.value, (value) => isPresent(value))
)

onBeforeRouteLeave(() => {
  if (isEdited.value && !isSaved.value && !confirmLeave()) {
    // cancel navigation
    return false
  }
})

async function editRequest(attribute) {
  detailView.value.activate(attribute)
}

async function resetCharacter() {
  character.value = _cloneDeep(emptyCharacter)

  // reset the trix-editors
  await detailView.value.reset()
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

    accept: () => resetCharacter(),

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
