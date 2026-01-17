<template>
  <Select
    v-model="model"
    ref="select"
  >
    <template #value="{ value, placeholder }">
      <div v-if="value">
        {{ value }}
      </div>

      <div v-else>
        {{ placeholder }}
      </div>
    </template>
  </Select>
</template>

<script setup>
const model = defineModel()
const select = useTemplateRef("select")
</script>

<style scoped></style>
