<template>
  <div class="contents">
    <div
      data-name="inactive"
      :class="isActive && 'hidden'"
      @click="activate"
      @keydown.enter.prevent="activate"
      @keydown.space.prevent="activate"
    >
      <slot name="default" />

      <slot
        name="inactive"
        :activate="activate"
      />
    </div>

    <div
      data-name="active"
      :class="!isActive && 'hidden'"
      @blur="deactivate"
    >
      <slot name="default" />

      <slot
        name="active"
        :deactivate="deactivate"
      />
    </div>
  </div>
</template>

<script setup>
defineExpose({ activate, deactivate })

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  "active",
  "inactive"
])

const isActive = ref(!props.disabled && props.active)

function activate() {
  if (!props.disabled && !isActive.value) {
    isActive.value = true
    emit("active")
  }
}

function deactivate() {
  if (isActive.value) {
    isActive.value = false
    emit("inactive")
  }
}
</script>

<style scoped></style>
