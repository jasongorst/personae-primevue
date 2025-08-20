<template>
  <Toolbar
    pt:root="
      bg-primary-0! dark:bg-primary-900! text-primary dark:text-primary
      border-0 rounded-md py-0 mb-4
    "
    pt:start="grow gap-2"
    pt:center="hidden"
    pt:end="flex-none"
  >
    <template #start>
      <Button variant="text">
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
      <UserWidget />
    </template>
  </Toolbar>
</template>

<script setup>

</script>

<style scoped>

</style>
