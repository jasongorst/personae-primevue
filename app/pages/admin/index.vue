<template>
  <div>
    <DataTable
      :value="users"
      datakey="id"
      scrollable
      scrollHeight="720px"
      selectionMode="single"
      :virtualScrollerOptions="{
        lazy: true,
        onLazyLoad: lazyLoadUsers,
        itemSize: 49,
        delay: 250,
        showLoader: true,
        loading: lazyLoading,
        numToleratedItems: 20
      }"
      :pt="{ tbody: 'text-base' }"
      @rowSelect="({ data }) => userDetail(data)"
    >
      <Column
        v-for="field of fields"
        :key="field"
        :field="field"
        :header="_upperCase(field)"
      >
        <template #body="slotProps">
          <template v-if="_isDate(slotProps.data?.[field])">
            {{ toNumericDate(slotProps.data?.[field]) }}
          </template>

          <template v-else>
            {{ slotProps.data?.[field] }}
          </template>
        </template>

        <template #loading>
          <Skeleton class="skeleton-animation" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
const { authClient } = useAuthClient()
const toast = useToast()
const fields = ["name", "email", "username", "role", "createdAt"]

// const { data: userCount } = useAsyncData("userCount", async () => await prisma.user.count())

const userCount = ref(1000)
const users = ref(Array.from({ length: userCount.value }))
const lazyLoading = ref(false)

const lazyLoadUsers = async ({ first, last }) => {
  lazyLoading.value = true
  const offset = first
  const limit = last - first

  // noinspection JSUnresolvedReference
  const {
    data: { users: result },
    error
  } = await authClient.admin.listUsers({
    query: {
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "asc"
    }
  })

  if (error) {
    toast.add({
      severity: "error",
      summary: "Load Error.",
      detail: error
    })
  }

  users.value.splice(offset, limit, ...result)
  lazyLoading.value = false
}

async function userDetail({ id }) {
  await navigateTo({ name: "userDetail", params: { id } })
}

function toNumericDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(date)
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.skeleton-animation::after {
  @apply absolute top-0 right-0 left-0 z-1 h-full -translate-x-full animate-[skeleton_1.2s_infinite] bg-linear-90
  from-transparent via-white/40 to-transparent content-[''] dark:via-white/4;
}

@keyframes skeleton {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
