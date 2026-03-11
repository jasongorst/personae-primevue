<template>
  <EditorCard
    name="character"
    :modelId="props.characterId"
    :action="props.action"
    :attributes="characterAttributes"
    :initialValue="props.initialValue"
    :options="options"
    :isSaved="isSaved"
    :redirectBack="{ name: 'characters' }"
    :schema="schema"
    @create="create"
    @update="update"
    @delete="destroy"
  />
</template>

<script setup>
const props = defineProps({
  action: {
    type: String,
    default: "view",
    validator: (value) => _includes(["create", "update", "view"], value)
  },

  characterId: {
    type: Number,
    validator: (value, props) => props.action === "create" || _isInteger(value)
  },

  initialValue: {
    type: Object,
    default: {},
    required: false
  }
})

const toast = useToast()
const { createCharacter } = useCreateCharacter()
const { updateCharacter } = useUpdateCharacter()
const { deleteCharacter } = useDeleteCharacter()

const { data: options } = useQuery(characterOptionsQuery)

const schema =
  props.action === "create" ? createCharacterSchema : updateCharacterSchema

const isSaved = ref(false)

async function create(character) {
  createCharacter(character)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Saved.",
    detail: "The character is saved.",
    life: 3000
  })

  await navigateTo({ name: "characters" })
}

async function update(editedFields) {
  updateCharacter(props.characterId, editedFields)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Updated.",
    detail: "The character is updated.",
    life: 3000
  })

  await navigateTo({ name: "characters" })
}

async function destroy() {
  deleteCharacter(props.characterId)
  isSaved.value = true

  toast.add({
    severity: "success",
    summary: "Deleted.",
    detail: "The character is deleted.",
    life: 3000
  })

  await navigateTo({ name: "characters" })
}
</script>

<style scoped></style>
