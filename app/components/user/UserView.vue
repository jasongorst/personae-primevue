<template>
  <DetailView
    v-model="user"
    :attributes="attributes"
    :options="options"
    @editRequest="(...args) => emit('editRequest', ...args)"
    ref="detailView"
  >
    <template #buttons>
      <slot name="buttons" />
    </template>
  </DetailView>
</template>

<script setup>
defineExpose({ activate })
const user = defineModel()
const emit = defineEmits(["editRequest"])
const detailView = useTemplateRef("detailView")

// TODO
const attributes = ref([
  { attribute: "name", type: "text" },
  { attribute: "email", type: "text" },
  { attribute: "username", type: "text" },
  { attribute: "role", type: "selectButton" },
  { attribute: "banned", type: "toggle" },
  { attribute: "banReason", type: "text" },
  { attribute: "banExpires", type: "dateTime" }
])

const options = ref({
  role: ["user", "admin"]
})

function activate(...args) {
  detailView.value.activate(...args)
}
</script>

<style scoped></style>
