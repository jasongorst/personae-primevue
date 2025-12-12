<template>
  <div>
    <Button
      v-if="isSignedIn"
      class="border-none px-6! py-2.75"
      variant="text"
      aria-haspopup="true"
      aria-controls="user_menu"
      @click="toggleMenu"
    >
      <!--suppress JSUnresolvedReference -->
      <span class="font-semibold">
        {{ user.username }}
      </span>

      <Icon
        name="ph:user-circle-fill"
        size="1.25rem"
      />
    </Button>

    <Button
      v-else
      class="border-none px-6! py-2.75"
      variant="text"
      @click="doSignIn"
    >
      <span class="font-semibold">Sign In</span>

      <Icon
        name="ph:user-circle-light"
        size="1.25rem"
      />
    </Button>

    <Menu
      class="mt-0"
      id="user_menu"
      :model="model"
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
const showSignIn = useState("showSignIn")
const { isSignedIn, signOut, user } = useAuthClient()
const toast = useToast()
const menu = useTemplateRef("menu")

const model = computed(() => {
  const menu = [{ label: "Sign Out", command: doSignOut }]

  if (isSignedIn.value && user.value.role === "admin") {
    menu.unshift({ label: "Dashboard", command: () => navigateTo("/admin/users") })
  }

  return menu
})

async function doSignOut() {
  await signOut()

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

<style scoped></style>
