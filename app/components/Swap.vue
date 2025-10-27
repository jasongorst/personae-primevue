<template>
  <div class="contents">
    <div
      :class="isActive && 'hidden'"
      @click="activate"
      @keydown.enter.prevent="activate"
      @keydown.space.prevent="activate"
    >
      <slot
        name="inactive"
        :activate="activate"
      />
    </div>

    <div :class="!isActive && 'hidden'">
      <slot
        name="active"
        :close="close"
      />
    </div>
  </div>
</template>

<script setup>
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

const emit = defineEmits(["active", "inactive", "update:active"])

defineExpose({ activate, close })

const isActive = ref(props.active)

function activate(event) {
  if (!props.disabled) {
    isActive.value = true
    emit("active", event)
    emit("update:active", true)
  }
}

function close(event) {
  isActive.value = false
  emit("inactive", event)
  emit("update:active", false)
}
</script>

<style scoped></style>
