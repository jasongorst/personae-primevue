<template>
  <div class="flex flex-row flex-wrap gap-1">
    <template
      v-for="attribute in categoryAttributes"
      :key="attribute"
    >
      <Chip
        v-for="value in filters[attribute].value"
        :label="value"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="p-0.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="emit('remove', attribute, value)"
          />
        </template>
      </Chip>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([ "remove" ])
</script>

<style scoped>

</style>
