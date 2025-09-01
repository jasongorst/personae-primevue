<template>
  <Toast class="top-14!">
    <!--suppress VueUnrecognizedSlot -->
    <template #messageicon="{ class: messageIconClass }">
      <div :class="messageIconClass">
        <template
          v-for="{ className, iconName } in messageIcons"
        >
          <Icon
            :class="className"
            :name="iconName"
            size="1.125rem"
          />
        </template>
      </div>
    </template>

    <template #closeicon="{ class: closeIconClass }">
        <span
          :class="closeIconClass"
          class="self-start"
        >
          <Icon name="ph:x-bold" />
        </span>
    </template>
  </Toast>
</template>

<script setup>
const messageIcons = [
  { className: "not-group-p-success:hidden", iconName: "ph:check-circle-fill" },
  { className: "not-group-p-info:hidden", iconName: "ph:info-fill" },
  { className: "not-group-p-warn:hidden", iconName: "ph:warning-circle-fill" },
  { className: "not-group-p-danger:hidden", iconName: "ph:warning-fill" },
  { className: "not-group-p-secondary:hidden", iconName: "ph:check-circle-fill" },
  { className: "not-group-p-contrast:hidden", iconName: "ph:check-circle-fill" }
]
</script>

<style scoped>

</style>
