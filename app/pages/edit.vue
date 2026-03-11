<template>
  <SpinnerModal
    v-if="isLoading"
    :visible="true"
  />

  <CharacterEditor
    v-else
    action="update"
    :characterId="characterId"
    :initialValue="character"
  />
</template>

<script setup>
definePageMeta({
  name: "characterEdit",
  path: "/edit/:characterId(\\d+)",
  middleware: "signed-in"
})

const characterId = _toInteger(useRoute().params?.characterId)
const { data: characterList, isLoading } = useQuery(characterListQuery)
const character = _find(characterList.value, { id: characterId })
</script>

<style scoped></style>
