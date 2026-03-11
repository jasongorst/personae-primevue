<template>
  <SpinnerModal
    v-if="isLoading"
    :visible="true"
  />

  <CharacterEditor
    v-else
    action="view"
    :characterId="characterId"
    :initialValue="character"
  />
</template>

<script setup>
definePageMeta({
  name: "characterView",
  path: "/show/:characterId(\\d+)"
})

const characterId = _toInteger(useRoute().params?.characterId)
const { data: characterList } = await useQuery(characterListQuery)
const character = _find(characterList.value, { id: characterId })
</script>

<style scoped></style>
