<template>
  <DetailCard>
    <template #attribute="{ attribute, type }">
      <div
        v-if="type === 'richText'"
        class="px-3 py-2 border border-transparent trix-content"
        v-html="character[attribute] || '&nbsp;'"
      />

      <div
        v-else
        class="px-3 py-2 border border-transparent"
      >
        {{ character[attribute] || "&nbsp;" }}
      </div>
    </template>

    <template #buttons>
      <Button>
        <NuxtLink to="/">
          Back
        </NuxtLink>
      </Button>
    </template>
  </DetailCard>
</template>

<script setup>
const route = useRoute()
const { getCharacter } = useCharactersStore()
const character = ref(emptyCharacter)

onMounted(async () => {
  character.value = await getCharacter(route.params.id)
})
</script>

<style scoped>

</style>
