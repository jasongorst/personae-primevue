import { twMerge } from "tailwind-merge"
import { mergeProps } from "vue"

export default function ptViewMerge(globalPTProps = {}, selfPTProps = {}, datasets) {
  const { class: globalClass, ...globalRest } = globalPTProps
  const { class: selfClass, ...selfRest } = selfPTProps

  return mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets)
}
