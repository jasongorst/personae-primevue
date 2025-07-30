<template>
  <Toolbar
    pt:root="
      flex items-center justify-between flex-wrap p-3 gap-2
      bg-primary-0 dark:bg-primary-900 text-primary dark:text-primary
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
          class="whitespace-nowrap text-[1.25rem] font-bold"
          data-testid="title"
          to="/"
        >
          <Icon name="personae" />

          Dramatis Personae
        </NuxtLink>
      </Button>
    </template>

    <template #end>
      <UserMenu />
    </template>
  </Toolbar>
</template>

<script setup>

</script>

<style scoped>

</style>
