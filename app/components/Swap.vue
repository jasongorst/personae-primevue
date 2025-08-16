<template>
  <div class="contents">
    <div
      class="hover:bg-primary/15 cursor-pointer"
      :class="isActive && 'hidden'"
      @click="open"
    >
      <slot />
    </div>

    <div :class="!isActive && 'hidden'">
      <slot name="active" :close="close" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  "active",
  "inactive",
  "update:active"
])

const isActive = ref(props.active)

function open(event) {
  isActive.value = true
  emit("active", event)
  emit("update:active", true)
}

function close(event) {
  isActive.value = false
  emit("inactive", event)
  emit("update:active", false)
}
</script>

<style scoped>

</style>