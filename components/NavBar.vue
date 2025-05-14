<template>
  <Toolbar
    class="mb-4"
    pt:start="flex-none"
    pt:center="grow"
    pt:end="flex-none"
  >
    <template #start>
      <Button variant="text">
        <NuxtLink
          class="whitespace-nowrap text-lg font-bold"
          data-testid="title"
          to="/"
        >
          <Icon name="personae" />

          Dramatis Personae
        </NuxtLink>
      </Button>

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

    <template #center>
      <SearchField />
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
