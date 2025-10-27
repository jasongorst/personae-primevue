export default {
  blockAttributes: {
    default: {
      tagName: "div",
      parse: false
    }
  },

  toolbar: {
    getDefaultHTML() {
      return `
        <div>
          <div class="flex flex-row justify-between flex-nowrap"><span
            role="group"
            data-trix-button-group="text-tools"
            class="*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
                *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0"
            data-pc-name="buttongroup"
            data-pc-section="root"
          ><button
            data-p=""
            type="button"
            aria-label="Bold"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="bold"
            data-trix-key="b"
            title="Bold"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc11=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M185.08 114.46A48 48 0 0 0 148 36H80a12 12 0 0 0-12 12v152a12 12 0 0 0 12 12h80a52 52 0 0 0 25.08-97.54M92 60h56a24 24 0 0 1 0 48H92Zm68 128H92v-56h68a28 28 0 0 1 0 56"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Italic"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="italic"
            data-trix-key="i"
            title="Italic"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc12=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M204 56a12 12 0 0 1-12 12h-31.35l-40 120H144a12 12 0 0 1 0 24H64a12 12 0 0 1 0-24h31.35l40-120H112a12 12 0 0 1 0-24h80a12 12 0 0 1 12 12"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Strikethrough"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="strike"
            title="Strikethrough"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc13=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12h-30.14A41.48 41.48 0 0 1 196 168c0 14.45-7.81 28.32-21.43 38.05C162 215.05 145.44 220 128 220s-34-4.95-46.57-13.95C67.81 196.32 60 182.45 60 168a12 12 0 0 1 24 0c0 15.18 20.15 28 44 28s44-12.82 44-28c0-12.76-9.3-20.18-35.35-28H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M75.11 100a12 12 0 0 0 12-12c0-16 17.58-28 40.89-28c17.36 0 31.37 6.65 37.48 17.78a12 12 0 0 0 21-11.56C176.13 47.3 154.25 36 128 36c-37 0-64.89 22.35-64.89 52a12 12 0 0 0 12 12"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Link"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="href"
            data-trix-action="link"
            data-trix-key="k"
            title="Link"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc14=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M117.18 188.74a12 12 0 0 1 0 17l-5.12 5.12A58.26 58.26 0 0 1 70.6 228a58.62 58.62 0 0 1-41.46-100.08l34.75-34.75a58.64 58.64 0 0 1 98.56 28.11a12 12 0 1 1-23.37 5.44a34.65 34.65 0 0 0-58.22-16.58l-34.75 34.75A34.62 34.62 0 0 0 70.57 204a34.4 34.4 0 0 0 24.49-10.14l5.11-5.12a12 12 0 0 1 17.01 0M226.83 45.17a58.65 58.65 0 0 0-82.93 0l-5.11 5.11a12 12 0 0 0 17 17l5.12-5.12a34.63 34.63 0 1 1 49 49l-34.81 34.7A34.4 34.4 0 0 1 150.61 156a34.63 34.63 0 0 1-33.69-26.72a12 12 0 0 0-23.38 5.44A58.64 58.64 0 0 0 150.56 180h.05a58.28 58.28 0 0 0 41.47-17.17l34.75-34.75a58.62 58.62 0 0 0 0-82.91"
          ></path></svg></button></span><span
            role="group"
            data-trix-button-group="block-tools"
            class="*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
                *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0"
            data-pc-name="buttongroup"
            data-pc-section="root"
          ><button
            data-p=""
            type="button"
            aria-label="Heading"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="heading1"
            title="Heading"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc16=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M212 56v144a12 12 0 0 1-24 0v-60H68v60a12 12 0 0 1-24 0V56a12 12 0 0 1 24 0v60h120V56a12 12 0 0 1 24 0"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Quote"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="quote"
            title="Quote"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc17=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M116 72v88a48.05 48.05 0 0 1-48 48a8 8 0 0 1 0-16a32 32 0 0 0 32-32v-8H40a16 16 0 0 1-16-16V72a16 16 0 0 1 16-16h60a16 16 0 0 1 16 16m100-16h-60a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h60v8a32 32 0 0 1-32 32a8 8 0 0 0 0 16a48.05 48.05 0 0 0 48-48V72a16 16 0 0 0-16-16"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Code"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="code"
            title="Code"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc18=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M71.68 97.22L34.74 128l36.94 30.78a12 12 0 1 1-15.36 18.44l-48-40a12 12 0 0 1 0-18.44l48-40a12 12 0 0 1 15.36 18.44m176 21.56l-48-40a12 12 0 1 0-15.36 18.44L221.26 128l-36.94 30.78a12 12 0 1 0 15.36 18.44l48-40a12 12 0 0 0 0-18.44M164.1 28.72a12 12 0 0 0-15.38 7.18l-64 176a12 12 0 0 0 7.18 15.37a11.8 11.8 0 0 0 4.1.73a12 12 0 0 0 11.28-7.9l64-176a12 12 0 0 0-7.18-15.38"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Bullets"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="bullet"
            title="Bullets"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc19=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M76 64a12 12 0 0 1 12-12h128a12 12 0 0 1 0 24H88a12 12 0 0 1-12-12m140 52H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24m0 64H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24M44 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0-64a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Numbers"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-attribute="number"
            title="Numbers"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc20=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12H116a12 12 0 0 1 0-24h100a12 12 0 0 1 12 12M116 76h100a12 12 0 0 0 0-24H116a12 12 0 0 0 0 24m100 104H116a12 12 0 0 0 0 24h100a12 12 0 0 0 0-24M44 59.31V104a12 12 0 0 0 24 0V40a12 12 0 0 0-17.36-10.73l-16 8a12 12 0 0 0 9.36 22Zm39.73 96.86a27.7 27.7 0 0 0-11.2-18.63A28.89 28.89 0 0 0 32.9 143a27.7 27.7 0 0 0-4.17 7.54a12 12 0 0 0 22.55 8.21a4 4 0 0 1 .58-1a4.78 4.78 0 0 1 6.5-.82a3.82 3.82 0 0 1 1.61 2.6a3.63 3.63 0 0 1-.77 2.77l-.13.17l-28.68 38.35A12 12 0 0 0 40 220h32a12 12 0 0 0 0-24h-8l14.28-19.11a27.48 27.48 0 0 0 5.45-20.72"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Decrease Level"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-action="decreaseNestingLevel"
            title="Decrease Level"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc21=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12h-96a12 12 0 0 1 0-24h96a12 12 0 0 1 12 12M120 76h96a12 12 0 0 0 0-24h-96a12 12 0 0 0 0 24m96 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24M72 148a12 12 0 0 0 8.49-20.49L49 96l31.49-31.52a12 12 0 0 0-17-17l-40 40a12 12 0 0 0 0 17l40 40A12 12 0 0 0 72 148"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Increase Level"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-action="increaseNestingLevel"
            title="Increase Level"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc22=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12h-96a12 12 0 0 1 0-24h96a12 12 0 0 1 12 12M120 76h96a12 12 0 0 0 0-24h-96a12 12 0 0 0 0 24m96 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24M31.51 144.49a12 12 0 0 0 17 0l40-40a12 12 0 0 0 0-17l-40-40a12 12 0 0 0-17 17L63 96l-31.49 31.51a12 12 0 0 0 0 16.98"
          ></path></svg></button></span><span
            role="group"
            data-trix-button-group="file-tools"
            class="*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
                *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0"
            data-pc-name="buttongroup"
            data-pc-section="root"
          ><button
            data-p=""
            type="button"
            aria-label="Attach Files"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-action="attachFiles"
            title="Attach Files"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc24=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="m212.48 136.49l-82.06 82a60 60 0 0 1-84.85-84.88l98.16-97.89a40 40 0 0 1 56.56 56.59l-.17.16l-95.8 92.22a12 12 0 1 1-16.64-17.3l95.71-92.12a16 16 0 0 0-22.7-22.56l-98.16 97.86a36 36 0 0 0 50.93 50.91l82.06-82a12 12 0 0 1 17 17Z"
          ></path></svg></button></span><span
            role="group"
            data-trix-button-group="history-tools"
            class="*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
                *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0"
            data-pc-name="buttongroup"
            data-pc-section="root"
          ><button
            data-p=""
            type="button"
            aria-label="Undo"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-action="undo"
            data-trix-key="z"
            title="Undo"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc26=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M228 128a100 100 0 0 1-98.66 100H128a99.4 99.4 0 0 1-68.62-27.29a12 12 0 0 1 16.48-17.45a76 76 0 1 0-1.57-109c-.13.13-.25.25-.39.37L54.89 92H72a12 12 0 0 1 0 24H24a12 12 0 0 1-12-12V56a12 12 0 0 1 24 0v20.72l21.48-19.66A100 100 0 0 1 228 128"
          ></path></svg></button><button
            data-p=""
            type="button"
            aria-label="Redo"
            data-pc-name="button"
            data-p-disabled="false"
            data-trix-action="redo"
            data-trix-key="shift+z"
            title="Redo"
            class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
            pc27=""
            data-pc-section="root"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph inline -mx-2 -my-1"
            style="font-size:1.5rem;"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M244 56v48a12 12 0 0 1-12 12h-48a12 12 0 1 1 0-24h17.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76 76 0 1 0 127 204h1a75.53 75.53 0 0 0 52.15-20.72a12 12 0 0 1 16.49 17.45A99.45 99.45 0 0 1 128 228h-1.37a100 100 0 1 1 71.88-170.94L220 76.72V56a12 12 0 0 1 24 0"
          ></path></svg></button></span></div>
          <div data-trix-dialogs="">
            <div
              role="toolbar"
              data-trix-dialog="href"
              data-trix-dialog-attribute="href"
              class="active:flex! items-center justify-between flex-wrap p-3 gap-2
                bg-surface-0 dark:bg-surface-900
                text-surface-700 dark:text-surface-0
                border border-surface-200 dark:border-surface-700 rounded-md"
              data-pc-name="toolbar"
              data-pc-section="root"
            >
              <div class="flex items-center grow" data-pc-section="start"><input
                type="url"
                name="href"
                data-p="fluid"
                placeholder="Enter a URL…"
                aria-label="URL"
                data-trix-validate-href=""
                required=""
                data-trix-input=""
                class="appearance-none rounded-md outline-hidden
                bg-surface-0 dark:bg-surface-950
                p-filled:bg-surface-50 dark:p-filled:bg-surface-800
                text-surface-700 dark:text-surface-0
                placeholder:text-surface-500 dark:placeholder:text-surface-400
                border border-surface-300 dark:border-surface-700
                enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
                enabled:focus:border-primary
                disabled:bg-surface-200 disabled:text-surface-500
                dark:disabled:bg-surface-700 dark:disabled:text-surface-400
                p-invalid:border-danger-400 dark:p-invalid:border-danger-300
                p-invalid:placeholder:text-danger-600 dark:p-invalid:placeholder:text-danger-400
                px-3 py-2 p-fluid:w-full
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
                transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
                data-pc-name="inputtext"
                data-pc-section="root"
              ></div>
              <div class="flex items-center hidden" data-pc-section="center"></div>
              <div class="flex items-center" data-pc-section="end"><span
                role="group"
                class="*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
                *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0"
                data-pc-name="buttongroup"
                data-pc-section="root"
              ><button
                data-p="small"
                type="button"
                aria-label="Link"
                data-pc-name="button"
                data-p-disabled="false"
                data-trix-method="setAttribute"
                class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
                pc31=""
                data-pc-section="root"
              ><span
                class="font-medium p-icon-only:invisible p-icon-only:w-0
                p-small:text-sm p-large:text-[1.125rem]" data-pc-section="label" data-p="small"
              >Link</span></button><button
                data-p="small"
                type="button"
                aria-label="Unlink"
                data-pc-name="button"
                data-p-disabled="false"
                data-trix-method="removeAttribute"
                class="inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
                px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
                bg-primary enabled:hover:bg-primary-emphasis enabled:active:bg-primary-emphasis-alt text-primary-contrast
                border border-primary enabled:hover:border-primary-emphasis enabled:active:border-primary-emphasis-alt
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
                p-vertical:flex-col p-fluid:w-full p-fluid:p-icon-only:w-10
                p-icon-only:w-10 p-icon-only:px-0 p-icon-only:gap-0
                p-icon-only:p-rounded:rounded-full p-icon-only:p-rounded:h-10
                p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
                p-large:text-[1.125rem] p-large:px-[0.875rem] p-large:py-[0.625rem]
                p-raised:shadow-sm p-rounded:rounded-[2rem]
                p-outlined:bg-transparent enabled:hover:p-outlined:bg-primary-50 enabled:active:p-outlined:bg-primary-100
                p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-200 enabled:active:p-outlined:border-primary-200
                p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
                dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
                dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-700 dark:enabled:active:p-outlined:border-primary-700
                dark:p-outlined:text-primary dark:enabled:hover:p-outlined:text-primary dark:enabled:active:p-outlined:text-primary
                p-text:bg-transparent enabled:hover:p-text:bg-primary-50 enabled:active:p-text:bg-primary-100
                p-text:border-transparent enabled:hover:p-text:border-transparent enabled:active:p-text:border-transparent
                p-text:text-primary enabled:hover:p-text:text-primary enabled:active:p-text:text-primary
                dark:p-text:bg-transparent dark:enabled:hover:p-text:bg-primary/5 dark:enabled:active:p-text:bg-primary/15
                dark:p-text:border-transparent dark:enabled:hover:p-text:border-transparent dark:enabled:active:p-text:border-transparent
                dark:p-text:text-primary dark:enabled:hover:p-text:text-primary dark:enabled:active:p-text:text-primary
                p-secondary:bg-secondary p-secondary:enabled:hover:bg-secondary-emphasis p-secondary:enabled:active:bg-secondary-emphasis-alt p-secondary:text-secondary-contrast
                p-secondary:border-secondary p-secondary:enabled:hover:border-secondary-emphasis p-secondary:enabled:active:border-secondary-emphasis-alt
                p-success:bg-success p-success:enabled:hover:bg-success-emphasis p-success:enabled:active:bg-success-emphasis-alt p-success:text-success-contrast
                p-success:border-success p-success:enabled:hover:border-success-emphasis p-success:enabled:active:border-success-emphasis-alt
                p-info:bg-info p-info:enabled:hover:bg-info-emphasis p-info:enabled:active:bg-info-emphasis-alt p-info:text-info-contrast
                p-info:border-info p-info:enabled:hover:border-info-emphasis p-info:enabled:active:border-info-emphasis-alt
                p-warn:bg-warn p-warn:enabled:hover:bg-warn-emphasis p-warn:enabled:active:bg-warn-emphasis-alt p-warn:text-warn-contrast
                p-warn:border-warn p-warn:enabled:hover:border-warn-emphasis p-warn:enabled:active:border-warn-emphasis-alt
                p-help:bg-help p-help:enabled:hover:bg-help-emphasis p-help:enabled:active:bg-help-emphasis-alt p-help:text-help-contrast
                p-help:border-help p-help:enabled:hover:border-help-emphasis p-help:enabled:active:border-help-emphasis-alt
                p-danger:bg-danger p-danger:enabled:hover:bg-danger-emphasis p-danger:enabled:active:bg-danger-emphasis-alt p-danger:text-danger-contrast
                p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt"
                pc32=""
                data-pc-section="root"
              ><span
                class="font-medium p-icon-only:invisible p-icon-only:w-0
                p-small:text-sm p-large:text-[1.125rem]" data-pc-section="label" data-p="small"
              >Unlink</span></button></span></div>
            </div>
          </div>
        </div>
      `
    }
  }
}
