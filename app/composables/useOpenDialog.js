import { defu } from "defu"

export default function useOpenDialog(dialog, component, options = {}) {
  const defaults = {
    props: {
      modal: true,
      dismissableMask: true,
      showHeader: false,
      pt: {
        root: "z-90 w-11/12 max-w-128",
        content: "p-0"
      },
      ptOptions: { mergeProps: ptViewMerge }
    }
  }

  return dialog.open(component, defu(options, defaults))
}
