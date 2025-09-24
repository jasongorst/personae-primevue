<template>
  <div>
    <Button
      v-if="isLoggedIn"
      variant="text"
      aria-haspopup="true"
      aria-controls="user_menu"
      @click="toggleMenu"
    >
      <!--suppress JSUnresolvedReference -->
      <span class="font-semibold">
        {{ user.email }}
      </span>

      <Icon
        name="ph:user-circle-fill"
        size="1.25rem"
      />
    </Button>

    <Button
      v-else
      variant="text"
      @click="doSignIn"
    >
      <span class="font-semibold">
        Sign In
      </span>

      <Icon
        name="ph:user-circle-light"
        size="1.25rem"
      />
    </Button>

    <Menu
      class="mt-0"
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
        >
          {{ item.label }}
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup>
const route = useRoute()
const toast = useToast()
const showSignIn = useState("showSignIn")
const { status, data: user, signOut } = useAuth()
const menu = useTemplateRef("menu")

const isLoggedIn = computed(() => status.value === "authenticated")

const menuItems = computed(() => {
  // noinspection JSUnresolvedReference
  if (isLoggedIn.value && user.value.admin) {
    // noinspection JSUnresolvedReference
    return [
      { label: "Dashboard", route: "/" },
      { label: "Sign Out", command: () => doSignOut() }
    ]
  } else if (isLoggedIn.value) {
    return [
      { label: "Sign Out", command: () => doSignOut() }
    ]
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
    summary: "Signed Out.",
    detail: "You've been signed out.",
    life: 3000
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
  menu.value.hide()
}
</script>

<style scoped>

</style>
