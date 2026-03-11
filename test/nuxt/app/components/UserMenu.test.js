import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import userMenu from "~/components/UserMenu.vue"

mockComponent("Icon", () => import("~~/test/mocks/components/Icon.mock.vue"))

// mocks needed

// SignInDialog
// ChangePasswordDialog
// const route = useRoute()
// const dialog = useDialog()
// const toast = useToast()
// const menu = useTemplateRef("menu")

let wrapper

beforeEach(() => {
  wrapper = mountSuspended(userMenu)
})

test("should render", () => {
  expect(wrapper).toBeDefined
})
