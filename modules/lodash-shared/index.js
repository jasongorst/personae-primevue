// noinspection JSUnusedLocalSymbols,JSUnresolvedReference

import {
  addImports,
  addServerImports,
  createResolver,
  defineNuxtModule
} from "@nuxt/kit"
import * as lodash from "lodash-es"
import excludeDefaults from "./exclude.js"

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: "lodash-shared",
    // The key in `nuxt.config` that holds your module options
    configKey: "lodash",
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: ">=4.0.0"
    }
  },

  // Default configuration options for your module, can also be a function returning those
  defaults: {
    // from nuxt-lodash
    prefix: "use",
    prefixSkip: "is",
    exclude: [],
    alias: [],
    upperAfterPrefix: true
  },

  // Shorthand sugar to register Nuxt hooks
  hooks: {},

  // Configuration for other modules - this does not ensure the module runs before
  // your module, but it allows you to change the other module's configuration before it runs
  moduleDependencies: {},

  // The function holding your module logic, it can be asynchronous
  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const aliasMap = new Map(moduleOptions.alias)
    const excludes = [...moduleOptions.exclude, ...excludeDefaults]

    const prefixSkip = moduleOptions.prefixSkip
      ? lodash.isArray(moduleOptions.prefixSkip)
        ? moduleOptions.prefixSkip
        : [moduleOptions.prefixSkip]
      : []

    for (const name of Object.keys(lodash)) {
      if (!excludes.includes(name)) {
        const alias = aliasMap.has(name) ? aliasMap.get(name) : name
        const prefix =
          (!prefixSkip.some((key) => alias.startsWith(key)) &&
            moduleOptions.prefix) ||
          ""

        const as = prefix
          ? prefix +
            (moduleOptions.upperAfterPrefix ? lodash.upperFirst(alias) : alias)
          : alias

        addImports({ name, as, from: resolve("./runtime/lodash") })
        addServerImports({ name, as, from: resolve("./runtime/lodash") })
      }
    }
  }
})
