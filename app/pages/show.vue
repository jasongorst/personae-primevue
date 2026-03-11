<template>
  <div>
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
  </div>
</template>

<script setup>
definePageMeta({
  name: "characterView",
  path: "/show/:characterId(\\d+)"
})

const characterId = _toInteger(useRoute().params?.characterId)
const { data: characterList, isLoading } = await useQuery(characterListQuery)
const character = _find(characterList.value, { id: characterId })
</script>

<style scoped></style>
