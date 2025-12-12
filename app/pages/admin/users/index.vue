<template>
  <div>
    <!--suppress JSValidateTypes -->
    <DataTable
      :value="users"
      datakey="id"
      :loading="loading"
      scrollable
      :scrollHeight="`calc(100vh - ${elementHeights})`"
      selectionMode="single"
      :pt="{
        header: { id: 'datatable_header' },
        footer: { id: 'datatable_footer' },
        tbody: 'text-base'
      }"
      @rowSelect="
        async ({ data: { id } }) =>
          navigateTo({ name: 'admin:userDetail', params: { id } })
      "
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
      </Column>

      <!--        TODO: fix spinner-->
      <!--      <template #loading>-->
      <!--        <SpinnerModal-->
      <!--          :visible="true"-->
      <!--        />-->
      <!--      </template>-->

      <template #footer>
        <UserToolbar
          :class="loading && 'hidden'"
          :count="count"
        />
      </template>
    </DataTable>
  </div>
</template>

<script setup>
definePageMeta({
  name: "admin:users",
  middleware: "admin"
})

const {
  $socketio: { socket }
} = useNuxtApp()

const { authClient } = useAuthClient()
const toast = useToast()
const fields = ["name", "email", "username", "role", "createdAt"]
const elementHeights = ref("0px")

const { data: users, pending: loading } = useAsyncData(
  "user:list",

  async () => {
    const { data: response } = await socket
      .timeout(3000)
      .emitWithAck("user:list")

    return response
  },

  { transform: deepParseTimestamps }
)

const count = computed(() => {
  if (users?.value) {
    return users.value.length
  } else {
    return 0
  }
})

onMounted(() => updateElementHeights())
onUpdated(() => updateElementHeights())

async function userDetail({ id }) {
  await navigateTo({ name: "admin:userDetail", params: { id } })
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

function updateElementHeights() {
  elementHeights.value = totalElementHeights()
}

function totalElementHeights() {
  // total height of non-datatable elements (in pixels)
  const elements = ["navbar", "datatable_footer"]

  let totalHeight = _reduce(
    elements,
    (acc, element) => acc + document?.getElementById(element)?.offsetHeight,
    0
  )

  // plus 16px [--spacing(4)] bottom navbar margin
  totalHeight += 16

  return _isNaN(totalHeight) ? 0 : `${totalHeight}px`
}
</script>

<style scoped></style>
