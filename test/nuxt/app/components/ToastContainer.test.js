import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import ToastContainer from "~/components/ToastContainer.vue"

mockComponent("Icon", () => import("~~/test/mocks/components/Icon.mock.vue"))

let wrapper

beforeEach(() => {
  wrapper = mountSuspended(ToastContainer)
})

test("should render", () => {
  expect(wrapper).toBeDefined
})
