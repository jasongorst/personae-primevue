<template>
  <DetailView
    v-model="character"
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
const confirm = useConfirm()
const toast = useToast()
const { token } = useAuth()
const { create } = useCharactersStore()
const detailView = useTemplateRef("detailView")

const character = ref(_cloneDeep(emptyCharacter))
const isEdited = computed(() =>
  _some(character.value, (value) => isPresent(value))
)

onBeforeRouteLeave(() => {
  if (isEdited.value && !confirmLeave()) {
    // cancel navigation
    return false
  }
})

async function reset() {
  character.value = _cloneDeep(emptyCharacter)

  // reset the trix-editors
  await detailView.value.reset()
}

async function saveCharacter() {
  const { data, error } = await create(character.value, token.value)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Saved.",
      detail: "The character is saved.",
      life: 3000
    })

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

    accept: async () => {
      await unlockCharacter()
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
