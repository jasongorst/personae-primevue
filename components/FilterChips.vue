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
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="p-0.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
            size="1.25em"
            @click="$emit('remove', attribute, value)"
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
