import { create } from "jsondiffpatch"
import { format, patch } from "jsondiffpatch/formatters/jsonpatch"

const jsonPatch = {
  diff(left, right, diffOptions = {}) {
    // default options
    _defaults(diffOptions, { omitRemovedValues: true })

    const jsonDiffPatch = create(diffOptions)
    const delta = jsonDiffPatch.diff(left, right)
    return format(delta)
  },

  // patch(target, patch)
  patch
}

export default jsonPatch
