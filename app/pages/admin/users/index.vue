<template>
  <div>
    <!--suppress JSValidateTypes -->
    <DataTable
      :value="users"
      datakey="id"
      :loading="isLoading"
      scrollable
      :scrollHeight="`calc(100vh - ${elementHeights}px)`"
      selectionMode="single"
      :pt="{
        header: { id: 'datatable_header' },
        footer: { id: 'datatable_footer' },
        tbody: 'text-base'
      }"
      @rowSelect="showUserEdit"
    >
      <Column
        v-for="column of columns"
        :key="column"
        :field="column"
        :header="_upperCase(column)"
      >
        <template #body="slotProps">
          <template v-if="_isDate(slotProps.data?.[column])">
            {{ toNumericDate(slotProps.data?.[column]) }}
          </template>

          <template v-else>
            {{ slotProps.data?.[column] }}
          </template>
        </template>
      </Column>

      <template #loading>
        <SpinnerModal
          :visible="true"
          maskClass="bg-surface!"
        />
      </template>

      <template #footer>
        <!--suppress JSValidateTypes -->
        <UserToolbar
          :class="isLoading && 'hidden'"
          :count="count"
        />
      </template>
    </DataTable>
  </div>
</template>

<script setup>
definePageMeta({
  name: "admin:users",
  middleware: ["signed-in", "admin"]
})

const columns = ["email", "name", "username", "role", "createdAt"]

const DEFAULT_ELEMENT_HEIGHTS = 109
const elementHeights = ref(DEFAULT_ELEMENT_HEIGHTS)

const { data: users, isLoading } = useQuery(userListQuery)

const count = computed(() => {
  if (users?.value) {
    return users.value.length
  } else {
    return 0
  }
})

onMounted(() => updateElementHeights())
onUpdated(() => updateElementHeights())

function toNumericDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(date)
}

function updateElementHeights() {
  elementHeights.value = totalElementHeights()
}

function totalElementHeights() {
  // total height of non-datatable elements (in pixels)
  const elements = ["navbar", "datatable_footer"]

  // noinspection JSUnresolvedReference
  let totalHeight = _reduce(
    elements,
    (acc, element) => acc + document?.getElementById(element)?.offsetHeight,
    0
  )

  // plus 16px [--spacing(4)] bottom navbar margin
  totalHeight += 16

  return _isNaN(totalHeight) ? DEFAULT_ELEMENT_HEIGHTS : totalHeight
}

async function showUserEdit({ data: { id: userId } }) {
  await navigateTo({ name: 'admin:userEdit', params: { userId } })
}
</script>

<style scoped></style>
