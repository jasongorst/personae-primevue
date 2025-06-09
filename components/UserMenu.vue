<template>
  <div>
    <Button
      variant="text"
      @click="toggleMenu"
      aria-haspopup="true"
      aria-controls="user_menu"
    >
      <Icon
        :name="isLoggedIn ? 'ph:user-circle-fill' : 'ph:user-circle-light'"
        size="1.25rem"
      />
    </Button>

    <Menu
      id="user_menu"
      :model="menuItems"
      :popup="true"
      ref="menu"
    >
      <template #item="{ item, props }">
        <!--suppress HtmlUnknownTarget -->
        <NuxtLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            {{ item.label }}
          </a>
        </NuxtLink>

        <a
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          target="_self"
          rel="noopener noreferrer"
        >
          {{ item.label }}
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup>
const toast = useToast()
const showSignIn = useState("showSignIn")
const { status, data: user, signOut } = useAuth()
const menu = useTemplateRef("menu")

const isLoggedIn = computed(() => status.value === "authenticated")

const menuItems = computed(() => {
  if (isLoggedIn.value) {
    // noinspection JSUnresolvedReference
    return [{
      label: user.value.email,
      items: [
        { label: "Dashboard", route: "/dashboard/account" },
        { label: "Sign Out", command: () => doSignOut() }
      ]
    }]
  } else {
    return [
      { label: "Sign In", command: () => doSignIn() }
    ]
  }
})

async function doSignOut() {
  await signOut({ redirect: false })

  toast.add({
    severity: "success",
    summary: "Success.",
    detail: "You've been signed out."
  })

  closeMenu()
}

function doSignIn() {
  closeMenu()
  showSignIn.value = true
}

function toggleMenu(event) {
  menu.value.toggle(event)
}

function closeMenu(_) {
  // noinspection JSUnresolvedReference
  menu.value.hide()
}
</script>

<style scoped>

</style>
