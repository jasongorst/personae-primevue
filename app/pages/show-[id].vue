<template>
  <Card class="max-w-prose mx-auto">
    <template #content>
      <!--suppress JSValidateTypes -->
      <div class="flex flex-col gap-2">
        <div
          class="flex flex-col"
          v-for="{ attribute, type } in apiAttributes"
          :key="attribute"
        >
          <label
            :for="attribute"
            class="ml-1 text-primary dark:text-primary text-sm"
          >
            {{ _startCase(attribute) }}
          </label>

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
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row gap-3 justify-end">
        <Button>
          <NuxtLink to="/">
            Back
          </NuxtLink>
        </Button>
      </div>
    </template>
  </Card>
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
