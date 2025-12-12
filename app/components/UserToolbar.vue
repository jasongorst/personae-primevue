<template>
  <Toolbar
    :pt="{ root: 'min-h-11.5 rounded-b-none' }"
  >
    <template #start>
      <div class="ps-6 text-sm whitespace-nowrap text-primary">
        Showing
        <strong class="font-semibold">{{ count }}</strong>
        {{ pluralize("user", count) }}
      </div>
    </template>

    <template #end>
      <Button
        class="border-none px-6! py-3.25"
        variant="text"
      >
        <!--suppress HtmlUnknownTarget -->
        <NuxtLink
          class="flex items-center gap-0.5"
          :to="{ name: 'admin:userCreate' }"
        >
          <span class="font-semibold">Add</span>

          <Icon name="ph:plus-bold" />
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
  }
})
</script>

<style scoped></style>
