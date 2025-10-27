<template>
  <ConfirmDialog class="flex flex-col gap-8 p-4">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex shrink-0 items-center justify-between">
        <span
          v-if="message.header"
          class="text-xl font-semibold text-primary"
        >
          {{ message.header }}
        </span>

        <Button
          variant="text"
          rounded
          class="absolute -top-4 -right-4"
          @click="rejectCallback"
        >
          <Icon
            name="ph:x-bold"
            size="0.875em"
          />
        </Button>
      </div>

      <div class="flex items-center gap-3 overflow-y-auto">
        <Icon
          v-if="message.icon"
          :name="message.icon"
          size="1.5em"
        />

        {{ message.message }}
      </div>

      <div class="flex justify-end gap-3">
        <Button
          v-bind="message.rejectProps"
          size="small"
          @click="rejectCallback"
        >
          <Icon
            v-if="message.rejectProps.icon"
            :name="message.rejectProps.icon"
          />

          <template v-if="message.rejectProps.label">
            {{ message.rejectProps.label }}
          </template>
        </Button>

        <Button
          v-bind="message.acceptProps"
          size="small"
          @click="acceptCallback"
        >
          <Icon
            v-if="message.acceptProps.icon"
            :name="message.acceptProps.icon"
          />

          <template v-if="message.acceptProps.label">
            {{ message.acceptProps.label }}
          </template>
        </Button>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup></script>

<style scoped></style>
