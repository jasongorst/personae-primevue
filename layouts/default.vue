<template>
  <Toast class="z-100">
    <!--suppress VueUnrecognizedSlot -->
    <template #messageicon="{ class: messageIconClass }">
      <div :class="messageIconClass">
        <Icon class="not-group-p-success:hidden" name="ph:check-circle-fill" size="1.125rem" />
        <Icon class="not-group-p-info:hidden" name="ph:info-fill" size="1.125rem" />
        <Icon class="not-group-p-warn:hidden" name="ph:warning-circle-fill" size="1.125rem" />
        <Icon class="not-group-p-danger:hidden" name="ph:warning-fill" size="1.125rem" />
        <Icon class="not-group-p-secondary:hidden " name="ph:check-circle-fill" size="1.125rem" />
        <Icon class="not-group-p-contrast:hidden" name="ph:check-circle-fill" size="1.125rem" />
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

  <ConfirmDialog class="flex flex-col p-4 gap-8">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex items-center justify-between shrink-0">
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
          <Icon name="ph:x-bold" size="0.875em" />
        </Button>
      </div>

      <div class="overflow-y-auto flex items-center gap-3">
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

  <SignIn
    class="z-90"
    v-model:visible="showSignIn"
  />

  <div
    class="w-full xl:max-w-screen-xl xl:mx-auto"
    data-testid="base-container"
  >
    <NavBar />

    <slot />
  </div>
</template>

<script setup>
const showSignIn = useState("showSignIn")
callOnce(() => showSignIn.value = false)

useState("query", () => "")
</script>

<style scoped>

</style>