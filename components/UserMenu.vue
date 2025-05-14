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
      ref="menu"
      :model="menuItems"
      :popup="true"
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
const isLoggedIn = ref(true)
const user = ref({ email: "foo@example.com" })

const menu = ref()

const menuItems = computed(() => {
  if (isLoggedIn.value) {
    return [{
      label: user.value.email,
      items: [
        { label: "Dashboard", route: "/dashboard/account" },
        { label: "Sign Out", command: () => signOut() }
      ]
    }]
  } else {
    return [
      { label: "Sign In", command: () => showSignInDialog() }
    ]
  }
})

function toggleMenu(event) {
  menu.value.toggle(event)
}

function signOut() {
  isLoggedIn.value = false
}

function showSignInDialog() {
  isLoggedIn.value = true
}
</script>

<style scoped>

</style>
