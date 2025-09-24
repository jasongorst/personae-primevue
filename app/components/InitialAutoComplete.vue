<script>
import AutoComplete from "primevue/autocomplete"

export default {
  name: "InitialAutoComplete",
  extends: AutoComplete,

  methods: {
    onFocus(event) {
      if (this.disabled) {
        // For ScreenReaders
        return
      }

      if (!this.dirty && this.completeOnFocus) {
        this.search(event, event.target.value, "focus")
      }

      this.dirty = true
      this.focused = true

      if (this.overlayVisible) {
        this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1
        this.scrollInView(this.focusedOptionIndex)
      }

      this.$emit("focus", event)
    },

    onInput(event) {
      if (this.typeahead) {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout)
        }

        let query = event.target.value

        if (!this.multiple) {
          this.updateModel(event, query)
        }

        if (query.length === 0 && this.minLength > 0) {
          this.hide()
          this.$emit("clear")
        } else {
          if (query.length >= this.minLength) {
            this.focusedOptionIndex = -1

            this.searchTimeout = setTimeout(() => {
              this.search(event, query, "input")
            }, this.delay)
          } else {
            this.hide()
          }
        }
      }
    },

    search(event, query, _) {
      //allow empty string but not undefined or null
      if (query === undefined || query === null) {
        return
      }

      // CHANGED: **DO** search blank values on input change

      //do not search blank values on input change
      // if (source === "input" && query.trim().length === 0) {
      //   return
      // }

      this.searching = true
      this.$emit("complete", { originalEvent: event, query })
    }
  }
}
</script>
