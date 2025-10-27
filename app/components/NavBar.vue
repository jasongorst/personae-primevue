<template>
  <Toolbar
    id="navbar"
    :pt="{
      root: 'mb-4 rounded-t-none',
      start: 'gap-2',
      center: 'hidden',
      end: 'flex-none'
    }"
  >
    <template #start>
      <Button
        class="border-none px-6!"
        variant="text"
      >
        <NuxtLink
          class="text-[1.25rem] font-bold whitespace-nowrap"
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

<script setup></script>

<style scoped></style>
