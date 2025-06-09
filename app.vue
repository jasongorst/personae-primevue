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

  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex items-center justify-between shrink-0 px-5 pt-5 pb-3">
        <span class="font-semibold text-xl">{{ message.header }}</span>

        <Button
          variant="text"
          rounded
          @click="rejectCallback"
          class="absolute -top-4 -right-4"
        >
          <Icon name="ph:x-bold" size="0.875em" />
        </Button>
      </div>

      <div class="overflow-y-auto pt-0 px-5 pb-5 flex items-center gap-2">
        <Icon name="ph:warning-fill" size="1.125em" />

        {{ message.message }}
      </div>

      <div class="pt-0 px-5 pb-5 flex justify-end gap-3">
        <Button
          :label="message.rejectProps.label"
          :severity="message.rejectProps.severity"
          :variant="message.rejectProps.variant"
          size="small"
          @click="rejectCallback"
        />

        <Button
          :severity="message.acceptProps.severity"
          :label="message.acceptProps.label"
          :variant="message.rejectProps.variant"
          size="small"
          @click="acceptCallback"
        />
      </div>
    </template>
  </ConfirmDialog>

  <SignIn
    class="z-90"
    :visible="showSignIn"
  />

  <div
    class="w-full xl:max-w-screen-xl xl:mx-auto"
    data-testid="base-container"
  >
    <NavBar />

    <NuxtPage />
  </div>
</template>

<script setup>
const showSignIn = useState("showSignIn")
callOnce(() => showSignIn.value = false)

useState("query", () => "")
</script>

<style scoped>

</style>
