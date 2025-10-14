import { create } from "jsondiffpatch"
import { format, patch as apply } from "jsondiffpatch/formatters/jsonpatch"

const jsonPatch = {
  compare(left, right, diffOptions = {}) {
    // add defaults (if undefined)
    _defaults(diffOptions, { omitRemovedValues: true })

    const jsondiffpatch = create(diffOptions)
    const delta = jsondiffpatch.diff(left, right)
    return format(delta)
  },

  // apply(target, patch)
  apply
}

export default jsonPatch
