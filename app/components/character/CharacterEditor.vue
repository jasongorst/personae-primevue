<template>
  <EditorCard
    name="character"
    :modelId="props.characterId"
    :action="props.action"
    :attributes="characterAttributes"
    :initialValue="initialValue"
    :options="options"
    :isSaved="isSaved"
    :redirectBack="{ name: 'characters' }"
    :schema="schema"
    @create="createCharacter"
    @update="updateCharacter"
    @delete="deleteCharacter"
  />
</template>

<script setup>
const props = defineProps({
  action: {
    type: String,
    default: "edit",
    validator: (value) => _includes(["create", "edit", "view"], value)
  },

  characterId: {
    type: Number,
    validator: (value, props) => props.action === "create" || _isInteger(value)
  }
})

const toast = useToast()

const charactersStore = await useCharactersStore()
const { create, destroy, getCharacter, update } = charactersStore
const { options } = storeToRefs(charactersStore)

const emptyCharacter = _mapValues(characterAttributes, () => "")

const initialValue =
  props.action === "create"
    ? emptyCharacter
    : await getCharacter(props.characterId)

const schema =
  props.action === "create" ? createCharacterSchema : updateCharacterSchema

const isSaved = ref(false)

async function createCharacter(character) {
  // noinspection JSUnresolvedReference
  const { data, error } = await create(character)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Saved.",
      detail: "The character is saved.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "characters" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Create Error.",
      detail: error
    })
  }
}

async function updateCharacter(editedFields) {
  const { data, error } = await update(props.characterId, editedFields)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Updated.",
      detail: "The character is updated.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "characters" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Update Error.",
      detail: error
    })
  }
}

async function deleteCharacter() {
  const { data, error } = await destroy(props.characterId)

  if (data) {
    toast.add({
      severity: "success",
      summary: "Deleted.",
      detail: "The character is deleted.",
      life: 3000
    })

    isSaved.value = true
    await navigateTo({ name: "characters" })
  } else {
    console.error(error)

    toast.add({
      severity: "error",
      summary: "Delete Error.",
      detail: error
    })
  }
}
</script>

<style scoped></style>
