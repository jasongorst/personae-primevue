import { fileURLToPath } from "node:url"
import { defineConfig, devices } from "@playwright/test"

const devicesToTest = ["Desktop Chrome"]

export default defineConfig({
  testDir: "./test/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  timeout: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  use: {
    trace: "on-first-retry",
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url))
    }
  },
  projects: devicesToTest.map((p) =>
    typeof p === "string" ? { name: p, use: devices[p] } : p
  )
})
