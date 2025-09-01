<template>
  <Toolbar
    pt:root="
      absolute bottom-0 left-0 w-full py-0 border-0 rounded-t-none rounded-b-md
      bg-primary-0! dark:bg-primary-900! text-primary dark:text-primary
    "
  >
    <template #start>
      <div class="whitespace-nowrap text-sm text-primary">
        Showing <strong class="font-semibold">{{ filteredCount }}</strong>
        of <strong class="font-semibold">{{ count }}</strong>
        character{{ (count > 1 ? "s" : "") }}
      </div>
    </template>

    <template #end>
      <Button variant="text">
        <NuxtLink
          class="flex items-center gap-0.5"
          to="/create"
        >
          <span class="font-semibold">
            Add
          </span>

          <Icon
            name="ph:plus-bold"
          />
        </NuxtLink>
      </Button>
    </template>
  </Toolbar>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true
  },

  filteredCount: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>

</style>
