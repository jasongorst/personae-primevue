<template>
  <Toolbar
    pt:root="
      w-full py-1 border-0 rounded-t-none rounded-b-md
      bg-primary-0! dark:bg-primary-900! text-primary dark:text-primary
      min-h-[calc(--spacing(6)+1.25rem+2px)]
    "
  >
    <template #start>
      <div class="whitespace-nowrap text-sm text-primary">
        Showing <strong class="font-semibold">{{ filteredCountValue }}</strong>
        of <strong class="font-semibold">{{ count }}</strong>
        {{ pluralize("character", count) }}
      </div>
    </template>

    <template #end>
      <Button
        v-if="isSignedIn"
        variant="text"
      >
        <!--suppress HtmlUnknownTarget -->
        <NuxtLink
          class="flex items-center gap-0.5"
          :to="{ name: 'create' }"
        >
          <span class="font-semibold">
            Add
          </span>

          <Icon
            name="ph:plus-bold"
          />
        </NuxtLink>
      </Button>
    </template>
  </Toolbar>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true
  },

  filteredCount: {
    type: Number,
    required: true
  }
})

const { status } = useAuth()
const isSignedIn = computed(() => status.value === "authenticated")

const filteredCountValue = computed(() => {
  if (props.filteredCount === props.count) {
    return "all"
  } else if (props.filteredCount === 0) {
    return "none"
  } else {
    return props.filteredCount
  }
})
</script>

<style scoped>

</style>
