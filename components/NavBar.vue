<template>
  <Toolbar
    pt:root="
      flex items-center justify-between flex-wrap p-3 gap-2
      bg-primary-0 dark:bg-primary-900 text-surface-700 dark:text-surface-0
      rounded-md mb-2 lg:mb-4
    "
    pt:start="flex items-center grow gap-2"
    pt:center="hidden"
    pt:end="flex items-center flex-none"
    :ptOptions="{ mergeProps: false }"
  >
    <template #start>
      <Button
        variant="text"
        :ptOptions="{ mergeProps: true }"
      >
        <NuxtLink
          class="whitespace-nowrap text-lg font-bold"
          data-testid="title"
          to="/"
        >
          <Icon name="personae" />

          Dramatis Personae
        </NuxtLink>
      </Button>

      <SearchField />

      <Button
        variant="text"
        @click="toggleShowFilters"
      >
        <Icon
          v-if="showFilters"
          name="ph:funnel-simple-x-bold"
          size="1.25rem"
        />

        <Icon
          v-else
          name="ph:funnel-simple-bold"
          size="1.25rem"
        />

        Filters
      </Button>
    </template>

    <template #end>
      <UserMenu />
    </template>
  </Toolbar>
</template>

<script setup>
const showFilters = useState("showFilters", () => false)

function toggleShowFilters() {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>

</style>
