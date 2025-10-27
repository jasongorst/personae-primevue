const passthrough = {
  autocomplete: {
    root: tw`inline-flex p-fluid:flex`,
    pcInputText: {
      root: tw`appearance-none rounded-md border border-surface-300 bg-surface-0 px-3 py-2
        text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden
        transition-colors duration-200 placeholder:text-surface-500
        enabled:hover:border-surface-400 enabled:focus:border-primary
        disabled:bg-surface-200 disabled:text-surface-500 dark:border-surface-700
        dark:bg-surface-950 dark:text-surface-0 dark:placeholder:text-surface-400
        dark:enabled:hover:border-surface-600 dark:disabled:bg-surface-700
        dark:disabled:text-surface-400 p-invalid:border-red-400
        p-invalid:placeholder:text-red-600 dark:p-invalid:border-red-300
        dark:p-invalid:placeholder:text-red-400 p-small:px-[0.625rem]
        p-small:py-[0.375rem] p-small:text-sm p-large:px-[0.875rem]
        p-large:py-[0.625rem] p-large:text-lg p-fluid:w-full p-filled:bg-surface-50
        dark:p-filled:bg-surface-800 p-has-dropdown:w-[1%] p-has-dropdown:flex-auto
        p-has-dropdown:rounded-e-none`
    },
    inputMultiple: tw`m-0 flex w-full cursor-text list-none flex-wrap items-center gap-1
      overflow-hidden rounded-md border border-surface-300 bg-surface-0 px-3 py-1
      text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors
      duration-200 outline-none not-p-empty:px-1 hover:border-surface-400
      dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0
      dark:hover:border-surface-600 p-invalid:border-red-400
      dark:p-invalid:border-red-300 p-filled:bg-surface-50
      dark:p-filled:bg-surface-800 p-disabled:pointer-events-none
      p-disabled:bg-surface-200 p-disabled:text-surface-500
      dark:p-disabled:bg-surface-700 dark:p-disabled:text-surface-400
      p-focus:border-primary p-has-dropdown:rounded-e-none`,
    chipItem: tw``,
    pcChip: {
      root: tw`inline-flex items-center gap-2 rounded-sm bg-surface-100 px-3 py-1
        text-surface-800 has-[img]:pt-1 has-[img]:pb-1 dark:bg-surface-800
        dark:text-surface-0 p-focus:bg-surface-200 p-focus:text-surface-800
        dark:p-focus:bg-surface-700 dark:p-focus:text-surface-0 p-removable:pe-2`,
      image: tw`-ms-2 h-8 w-8 rounded-full`,
      icon: tw`h-4 w-4 text-base text-surface-800 dark:bg-surface-0`,
      label: tw``,
      removeIcon: tw`h-4 w-4 cursor-pointer rounded-full text-base text-surface-800
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
        focus-visible:outline-primary dark:text-surface-0`
    },
    chipIcon: tw``,
    inputChip: tw`inline-flex max-w-30 flex-auto py-1`,
    input: tw`m-0 w-full rounded-none border-none bg-transparent p-0 text-inherit shadow-none
      outline-none placeholder:text-surface-500 dark:placeholder:text-surface-400`,
    loader: tw`absolute end-3 top-1/2 -mt-2 p-has-dropdown:end-[3.25rem]`,
    dropdown: tw`relative inline-flex w-10 shrink-0 cursor-pointer items-center justify-center
      overflow-hidden rounded-e-md border border-s-0 border-surface-300 bg-surface-100
      text-surface-600 transition-colors duration-200 select-none
      focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
      focus-visible:outline-primary enabled:hover:bg-surface-200
      enabled:hover:text-surface-700 enabled:active:bg-surface-300
      enabled:hover:active:text-surface-800 dark:border-surface-700
      dark:bg-surface-800 dark:text-surface-300 dark:enabled:hover:bg-surface-700
      dark:enabled:hover:text-surface-200 dark:enabled:active:bg-surface-600
      dark:enabled:active:text-surface-100`,
    dropdownIcon: tw``,
    overlay: tw`absolute top-0 left-0 rounded-md border border-surface-200 bg-surface-50
      text-surface-700
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]
      dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0
      p-portal-self:min-w-full`,
    virtualScroller: tw``,
    listContainer: tw`overflow-auto`,
    list: tw`m-0 flex list-none flex-col gap-[2px] p-1`,
    optionGroup: tw`m-0 bg-transparent px-3 py-2 font-semibold text-surface-500
      dark:text-surface-400`,
    option: tw`relative flex cursor-pointer items-center overflow-hidden rounded-sm border-none
      bg-transparent px-3 py-2 whitespace-nowrap text-surface-700 transition-colors
      duration-200 dark:text-surface-0 p-selected:bg-highlight p-focus:bg-surface-100
      p-focus:text-surface-800 dark:p-focus:bg-surface-800 dark:p-focus:text-surface-0
      p-focus:p-selected:bg-highlight-emphasis`,
    emptyMessage: tw`px-3 py-2`,
    searchResultMessage: tw``,
    selectedMessage: tw``,
    transition: {
      enterFromClass: tw`scale-y-75 opacity-0`,
      enterActiveClass: tw`transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: tw`transition-opacity duration-100 ease-linear`,
      leaveToClass: tw`opacity-0`
    }
  },

  button: {
    root: tw`relative inline-flex cursor-pointer items-center justify-center gap-2
      overflow-hidden rounded-md border border-primary bg-primary px-3 py-2
      text-primary-contrast transition-colors duration-200 select-none
      focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
      focus-visible:outline-primary enabled:hover:border-primary-emphasis
      enabled:hover:bg-primary-emphasis enabled:active:border-primary-emphasis-alt
      enabled:active:bg-primary-emphasis-alt disabled:pointer-events-none
      disabled:opacity-60 p-small:px-[0.625rem] p-small:py-[0.375rem] p-small:text-sm
      p-large:px-[0.875rem] p-large:py-[0.625rem] p-large:text-[1.125rem]
      p-fluid:w-full p-vertical:flex-col p-icon-only:w-10 p-icon-only:gap-0
      p-icon-only:px-0 p-fluid:p-icon-only:w-10 p-rounded:rounded-[2rem]
      p-icon-only:p-rounded:h-10 p-icon-only:p-rounded:rounded-full p-raised:shadow-sm
      p-secondary:border-secondary p-secondary:bg-secondary
      p-secondary:text-secondary-contrast
      p-secondary:enabled:hover:border-secondary-emphasis
      p-secondary:enabled:hover:bg-secondary-emphasis
      p-secondary:enabled:active:border-secondary-emphasis-alt
      p-secondary:enabled:active:bg-secondary-emphasis-alt p-success:border-success
      p-success:bg-success p-success:text-success-contrast
      p-success:enabled:hover:border-success-emphasis
      p-success:enabled:hover:bg-success-emphasis
      p-success:enabled:active:border-success-emphasis-alt
      p-success:enabled:active:bg-success-emphasis-alt p-info:border-info
      p-info:bg-info p-info:text-info-contrast
      p-info:enabled:hover:border-info-emphasis p-info:enabled:hover:bg-info-emphasis
      p-info:enabled:active:border-info-emphasis-alt
      p-info:enabled:active:bg-info-emphasis-alt p-warn:border-warn p-warn:bg-warn
      p-warn:text-warn-contrast p-warn:enabled:hover:border-warn-emphasis
      p-warn:enabled:hover:bg-warn-emphasis
      p-warn:enabled:active:border-warn-emphasis-alt
      p-warn:enabled:active:bg-warn-emphasis-alt p-danger:border-danger
      p-danger:bg-danger p-danger:text-danger-contrast
      p-danger:enabled:hover:border-danger-emphasis
      p-danger:enabled:hover:bg-danger-emphasis
      p-danger:enabled:active:border-danger-emphasis-alt
      p-danger:enabled:active:bg-danger-emphasis-alt p-outlined:border-primary-200
      p-outlined:bg-transparent p-outlined:text-primary
      enabled:hover:p-outlined:border-primary-300
      enabled:hover:p-outlined:bg-primary-50 enabled:hover:p-outlined:text-primary
      enabled:active:p-outlined:border-primary-400
      enabled:active:p-outlined:bg-primary-100 enabled:active:p-outlined:text-primary
      dark:p-outlined:border-primary-700 dark:p-outlined:bg-transparent
      dark:p-outlined:text-primary dark:enabled:hover:p-outlined:border-primary-600
      dark:enabled:hover:p-outlined:bg-primary/5
      dark:enabled:hover:p-outlined:text-primary
      dark:enabled:active:p-outlined:border-primary-500
      dark:enabled:active:p-outlined:bg-primary/15
      dark:enabled:active:p-outlined:text-primary p-text:border-transparent
      p-text:bg-transparent p-text:text-primary
      enabled:hover:p-text:border-transparent enabled:hover:p-text:bg-primary-50
      enabled:hover:p-text:text-primary enabled:active:p-text:border-transparent
      enabled:active:p-text:bg-primary-100 enabled:active:p-text:text-primary
      dark:p-text:border-transparent dark:p-text:bg-transparent
      dark:p-text:text-primary dark:enabled:hover:p-text:border-transparent
      dark:enabled:hover:p-text:bg-primary/5 dark:enabled:hover:p-text:text-primary
      dark:enabled:active:p-text:border-transparent
      dark:enabled:active:p-text:bg-primary/15 dark:enabled:active:p-text:text-primary
      p-help:border-help p-help:bg-help p-help:text-help-contrast
      p-help:enabled:hover:border-help-emphasis p-help:enabled:hover:bg-help-emphasis
      p-help:enabled:active:border-help-emphasis-alt
      p-help:enabled:active:bg-help-emphasis-alt`,
    loadingIcon: tw`animate-spin`,
    icon: tw`p-right:order-1 p-bottom:order-2`,
    label: tw`font-medium p-small:text-sm p-large:text-[1.125rem] p-icon-only:invisible
      p-icon-only:w-0`,
    pcBadge: {
      root: tw`h-4 min-w-4 rounded-full bg-primary-contrast text-xs leading-4 font-bold
        text-primary`
    }
  },

  buttongroup: {
    root: tw`*:rounded-none *:not-last:border-r-0 *:first:rounded-s-md *:last:rounded-e-md
      *:focus-visible:relative *:focus-visible:z-10`
  },

  card: {
    root: tw`flex flex-col rounded-xl bg-surface-0 text-surface-700 shadow-md
      dark:bg-surface-900 dark:text-surface-0`,
    header: tw``,
    body: tw`flex flex-col gap-2 p-5`,
    caption: tw`flex flex-col gap-2`,
    title: tw`text-xl font-medium`,
    subtitle: tw`text-surface-500 dark:text-surface-400`,
    content: tw``,
    footer: tw``
  },

  chip: {
    root: tw`dark:text-primary-0 inline-flex items-center gap-1.5 rounded-2xl bg-primary-100
      px-3 py-2 text-primary-800 has-[img]:pt-1 has-[img]:pb-1 dark:bg-primary-800
      p-removable:pe-2`,
    image: tw`-ms-2 h-8 w-8 rounded-full`,
    icon: tw`h-4 w-4 text-base text-surface-800 dark:text-surface-0`
  },

  confirmdialog: {
    root: tw`max-h-[90%] max-w-screen rounded-xl border border-surface-200 bg-surface-0
      text-surface-700 shadow-lg dark:border-surface-700 dark:bg-surface-900
      dark:text-surface-0`,
    mask: tw`fixed start-0 top-0 h-full w-full bg-black/50`,
    transition: {
      enterFromClass: tw`scale-75 opacity-0`,
      enterActiveClass: tw`transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: tw`transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]`,
      leaveToClass: tw`scale-75 opacity-0`
    }
  },

  datatable: {
    root: tw`relative text-sm whitespace-nowrap p-flex-scrollable:flex
      p-flex-scrollable:h-full p-flex-scrollable:flex-col`,
    tableContainer: tw`p-scrollable:relative p-flex-scrollable:flex p-flex-scrollable:h-full
      p-flex-scrollable:flex-1 p-flex-scrollable:flex-col`,
    header: tw`border-b border-surface-200 bg-surface-50 pb-0 text-surface-700
      dark:border-surface-700 dark:bg-surface-950 dark:text-surface-100`,
    table: tw`w-full border-separate border-spacing-0`,
    thead: tw`bg-surface-0! dark:bg-surface-950! p-scrollable:top-0 p-scrollable:z-10
      p-scrollable:bg-surface-0 dark:p-scrollable:bg-surface-900`,
    headerRow: tw`last:align-top last:*:border-r-0 first-of-type:bg-surface-0
      first-of-type:*:border-r-2 nth-of-type-2:*:px-1 nth-of-type-2:*:py-2
      dark:first-of-type:bg-surface-900`,
    tbody: tw`p-hoverable:*:hover:bg-primary/15 p-frozen:sticky p-frozen:z-10`,
    bodyRow: tw`bg-surface-0 text-surface-700 odd:bg-surface-50 dark:bg-surface-900
      dark:text-surface-100 dark:odd:bg-surface-950 p-selected:bg-highlight!
      p-selectable:cursor-pointer`,
    tfoot: tw`p-scrollable:bottom-0 p-scrollable:z-10 p-scrollable:bg-surface-0
      dark:p-scrollable:bg-surface-900`,
    footer: tw`border-b border-surface-200 bg-surface-0 p-0 text-surface-700
      dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0`,
    mask: tw`backdrop-blu- absolute z-10 flex h-full w-full items-center justify-center
      bg-black/50 text-surface-200`,
    column: {
      root: tw``,
      headerCell: tw`group relative max-w-[8rem] truncate border-b border-surface-200
        border-r-surface-200 bg-transparent px-4 py-3 text-start font-normal
        transition-colors duration-200 dark:border-surface-700 dark:border-r-surface-700
        p-sortable:cursor-pointer p-sortable:select-none p-sortable:hover:bg-surface-100
        p-sortable:hover:text-surface-800 p-sortable:focus-visible:outline
        p-sortable:focus-visible:outline-1 p-sortable:focus-visible:-outline-offset-1
        p-sortable:focus-visible:outline-primary dark:p-sortable:hover:bg-surface-700
        dark:p-sortable:hover:text-surface-0 p-frozen:sticky p-frozen:z-10
        p-frozen:bg-surface-0 dark:p-frozen:bg-surface-900`,
      columnHeaderContent: tw`flex items-center gap-2`,
      columnTitle: tw`block leading-[1.25rem] font-semibold`,
      bodyCell: tw`max-w-[8rem] truncate border-b border-surface-200 px-4 py-3 text-start
        dark:border-surface-800 p-frozen:sticky p-frozen:bg-surface-0
        dark:p-frozen:bg-surface-900`,
      bodyCellContent: tw``,
      footerCell: tw`border-b border-surface-200 bg-surface-0 px-4 py-3 text-start text-surface-700
        dark:border-surface-800 dark:bg-surface-900 dark:text-surface-0 p-frozen:sticky
        p-frozen:bg-surface-0 dark:p-frozen:bg-surface-900`,
      columnFooter: tw`font-semibold`,
      columnResizer: tw`absolute end-0 top-0 m-0 block h-full w-2 cursor-col-resize border
        border-transparent p-0`,
      sort: tw`block leading-none`,
      sortIcon: tw`text-surface-500 transition-colors duration-200
        group-p-sortable:not-group-p-sorted:group-hover:text-surface-600
        group-p-sorted:bg-highlight dark:text-surface-400
        dark:group-p-sortable:not-group-p-sorted:group-hover:text-surface-300`,
      pcSortBadge: {
        root: tw`inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary
          text-xs font-bold text-primary-contrast`
      },
      pcHeaderCheckbox: {
        root: tw`relative inline-flex h-5 w-5 align-bottom select-none`,
        input: tw`peer absolute start-0 top-0 z-10 m-0 h-full w-full cursor-pointer
          appearance-none rounded-xs border border-transparent p-0 opacity-0
          disabled:cursor-default`,
        box: tw`flex h-5 w-5 items-center justify-center rounded-sm border border-surface-300
          bg-surface-0 text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
          transition-colors duration-200 peer-focus-visible:outline
          peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2
          peer-focus-visible:outline-primary peer-enabled:peer-hover:border-surface-400
          dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0
          dark:peer-enabled:peer-hover:border-surface-600 p-checked:border-primary
          p-checked:bg-primary p-checked:text-primary-contrast
          peer-enabled:peer-hover:p-checked:border-primary-emphasis
          peer-enabled:peer-hover:p-checked:bg-primary-emphasis
          p-disabled:border-surface-300 p-disabled:bg-surface-200
          p-disabled:text-surface-700 dark:p-disabled:border-surface-700
          dark:p-disabled:bg-surface-400 dark:p-disabled:text-surface-400`,
        icon: tw`h-[0.875rem] w-[0.875rem] text-sm transition-none`
      },
      pcRowRadiobutton: {
        root: tw`relative inline-flex h-5 w-5 select-none`,
        input: tw`peer absolute start-0 top-0 z-10 m-0 h-full w-full cursor-pointer
          appearance-none rounded-full border border-transparent p-0 opacity-0
          disabled:cursor-default`,
        box: tw`flex h-5 w-5 items-center justify-center rounded-full border border-surface-300
          bg-surface-0 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors
          duration-200 peer-focus-visible:outline peer-focus-visible:outline-1
          peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary
          peer-enabled:peer-hover:border-surface-400 dark:border-surface-700
          dark:bg-surface-950 dark:peer-enabled:peer-hover:border-surface-600
          p-invalid:border-danger-400 dark:p-invalid:border-danger-300
          p-filled:bg-surface-50 dark:p-filled:bg-surface-800 p-checked:border-primary
          p-checked:bg-primary peer-enabled:peer-hover:p-checked:border-primary-emphasis
          peer-enabled:peer-hover:p-checked:bg-primary-emphasis
          p-disabled:border-surface-300 p-disabled:bg-surface-200
          dark:p-disabled:border-surface-700 dark:p-disabled:bg-surface-400`,
        icon: tw`h-3 w-3 scale-[0.1] rounded-full bg-transparent text-xs transition-all
          duration-200 backface-hidden p-checked:visible p-checked:scale-100
          p-checked:bg-primary-contrast p-disabled:bg-surface-700
          dark:p-disabled:bg-surface-400`
      },
      pcRowCheckbox: {
        root: tw`relative inline-flex h-5 w-5 align-bottom select-none`,
        input: tw`peer absolute start-0 top-0 z-10 m-0 h-full w-full cursor-pointer
          appearance-none rounded-xs border border-transparent p-0 opacity-0
          disabled:cursor-default`,
        box: tw`flex h-5 w-5 items-center justify-center rounded-sm border border-surface-300
          bg-surface-0 text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
          transition-colors duration-200 peer-focus-visible:outline
          peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2
          peer-focus-visible:outline-primary peer-enabled:peer-hover:border-surface-400
          dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0
          dark:peer-enabled:peer-hover:border-surface-600 p-checked:border-primary
          p-checked:bg-primary p-checked:text-primary-contrast
          peer-enabled:peer-hover:p-checked:border-primary-emphasis
          peer-enabled:peer-hover:p-checked:bg-primary-emphasis
          p-disabled:border-surface-300 p-disabled:bg-surface-200
          p-disabled:text-surface-700 dark:p-disabled:border-surface-700
          dark:p-disabled:bg-surface-400 dark:p-disabled:text-surface-400`,
        icon: tw`h-[0.875rem] w-[0.875rem] text-sm transition-none`
      },
      rowToggleButton: tw`relative inline-flex h-7 w-7 cursor-pointer items-center justify-center
        overflow-hidden rounded-full border-none bg-transparent text-surface-500
        transition-colors duration-200 select-none focus-visible:outline
        focus-visible:outline-1 focus-visible:outline-offset-2
        focus-visible:outline-primary enabled:hover:bg-surface-100
        enabled:hover:text-surface-700 dark:text-surface-400
        dark:enabled:hover:bg-surface-800 dark:enabled:hover:text-surface-0
        p-selected:hover:bg-surface-0 p-selected:hover:text-primary
        dark:p-selected:hover:bg-surface-900`,
      rowToggleIcon: tw``,
      reorderableRowHandle: tw``
    },
    loadingIcon: tw``,
    pcPaginator: {
      paginatorContainer: tw`border-surface-200 dark:border-surface-700 p-bottom:border-b`,
      root: tw`flex flex-wrap items-center justify-center gap-1 rounded-md bg-surface-0 px-4
        py-2 text-surface-700 dark:bg-surface-900 dark:text-surface-0`
    },
    columnResizeIndicator: tw`absolute z-10 hidden w-px bg-primary`,
    rowReorderIndicatorUp: tw`absolute hidden`,
    rowReorderIndicatorDown: tw`absolute hidden`
  },

  dialog: {
    root: tw`max-h-full max-w-screen rounded-xl border border-surface-100 bg-surface-200
      text-surface-700 shadow-lg dark:border-surface-800 dark:bg-surface-700
      dark:text-surface-0 p-maximized:start-0 p-maximized:top-0 p-maximized:h-screen
      p-maximized:max-h-[90%] p-maximized:w-screen p-maximized:rounded-none`,
    header: tw`flex shrink-0 items-center justify-between p-5`,
    title: tw`text-xl font-semibold`,
    headerActions: tw`flex items-center gap-2`,
    content: tw`overflow-y-auto px-5 pt-0 pb-5 p-maximized:grow`,
    footer: tw`flex shrink-0 justify-end gap-2 px-5 pt-0 pb-5`,
    mask: tw`p-modal:fixed p-modal:start-0 p-modal:top-0 p-modal:h-full p-modal:w-full
      p-modal:bg-black/50`,
    transition: {
      enterFromClass: tw`scale-75 opacity-0`,
      enterActiveClass: tw`transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: tw`transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]`,
      leaveToClass: tw`scale-75 opacity-0`
    }
  },

  inplace: {
    root: tw``,
    display: tw`inline-block cursor-pointer rounded-md border border-transparent px-3 py-2
      transition-colors duration-200 hover:bg-surface-100 hover:text-surface-800
      focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
      focus-visible:outline-primary dark:hover:bg-surface-800
      dark:hover:text-surface-0 p-disabled:pointer-events-none`,
    content: tw`block`
  },

  inputtext: {
    root: tw`appearance-none rounded-md border border-surface-300 bg-surface-0 px-3 py-2
      text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden
      transition-colors duration-200 placeholder:text-surface-500
      enabled:hover:border-surface-400 enabled:focus:border-primary
      disabled:bg-surface-200 disabled:text-surface-500 dark:border-surface-700
      dark:bg-surface-950 dark:text-surface-0 dark:placeholder:text-surface-400
      dark:enabled:hover:border-surface-600 dark:disabled:bg-surface-700
      dark:disabled:text-surface-400 p-invalid:border-danger-400
      p-invalid:placeholder:text-danger-600 dark:p-invalid:border-danger-300
      dark:p-invalid:placeholder:text-danger-400 p-small:px-[0.625rem]
      p-small:py-[0.375rem] p-small:text-sm p-large:px-[0.875rem]
      p-large:py-[0.625rem] p-large:text-lg p-fluid:w-full p-filled:bg-surface-50
      dark:p-filled:bg-surface-800`
  },

  listbox: {
    root: tw`group rounded-md border border-surface-300 bg-surface-0 text-sm text-surface-700
      shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors duration-200
      dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0
      p-invalid:border-danger-400 dark:p-invalid:border-danger-300
      p-disabled:pointer-events-none p-disabled:bg-surface-200
      p-disabled:text-surface-500 dark:p-disabled:bg-surface-700
      dark:p-disabled:text-surface-400`,
    header: tw`px-4 pt-2 pb-1`,
    pcFilterContainer: {
      root: tw`relative`
    },
    pcFilter: {
      root: tw`w-full appearance-none rounded-md border border-surface-300 bg-surface-0 py-2
        ps-3 pe-10 text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        outline-hidden transition-colors duration-200 placeholder:text-surface-500
        enabled:hover:border-surface-400 enabled:focus:border-primary
        disabled:bg-surface-200 disabled:text-surface-500 dark:border-surface-700
        dark:bg-surface-950 dark:text-surface-0 dark:placeholder:text-surface-400
        dark:enabled:hover:border-surface-600 dark:disabled:bg-surface-700
        dark:disabled:text-surface-400 p-fluid:w-full`
    },
    pcFilterIconContainer: {
      root: tw`absolute end-3 top-1/2 z-1 -mt-2 leading-none`
    },
    filterIcon: tw`text-surface-400`,
    listContainer: tw`overflow-auto`,
    virtualScroller: tw``,
    list: tw`m-0 flex list-none flex-col gap-[2px] p-0 outline-none`,
    optionGroup: tw`m-0 px-3 py-2 font-semibold text-surface-500 dark:text-surface-400`,
    option: tw`relative flex cursor-pointer items-center overflow-hidden rounded-sm border-none
      p-1 text-surface-700 transition-colors duration-200
      group-p-disabled:pointer-events-none group-p-disabled:text-surface-500
      hover:not-p-selected:bg-surface-100 hover:not-p-selected:text-surface-800
      dark:text-surface-0 dark:group-p-disabled:text-surface-400
      dark:hover:not-p-selected:bg-surface-800
      dark:hover:not-p-selected:text-surface-0 p-disabled:pointer-events-none
      p-disabled:opacity-60 p-selected:bg-highlight
      p-focus:not-p-selected:bg-surface-100 p-focus:not-p-selected:text-surface-800
      dark:p-focus:not-p-selected:bg-surface-800
      dark:p-focus:not-p-selected:text-surface-0
      p-selected:p-focus:bg-highlight-emphasis`,
    optionCheckIcon: tw``,
    optionBlankIcon: tw``,
    emptyMessage: tw`px-3 py-2`
  },

  menu: {
    root: tw`bg-primary-0 min-w-52 rounded-md text-primary dark:bg-primary-900
      dark:text-primary
      p-popup:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    list: tw`mx-1 mb-1 flex list-none flex-col gap-0.5 outline-none`,
    item: tw`p-disabled:pointer-events-none p-disabled:opacity-60`,
    itemContent: tw`group hover:bbg-primary-50 rounded-sm transition-colors duration-200
      hover:text-primary dark:hover:bg-primary/5 dark:hover:text-primary
      p-focus:bg-primary-50 p-focus:text-primary dark:p-focus:bg-primary/5
      dark:p-focus:text-primary`,
    itemLink: tw`relative flex cursor-pointer items-center gap-2 overflow-hidden px-4 py-2
      text-inherit no-underline outline-none select-none`,
    itemIcon: tw`text-primary group-hover:text-primary dark:text-primary
      dark:group-hover:text-primary p-focus:text-primary dark:p-focus:text-primary`,
    itemLabel: tw``,
    submenuLabel: tw`bg-transparent px-4 py-2 font-semibold text-primary dark:text-primary`,
    separator: tw`border-t border-primary dark:border-primary`,
    transition: {
      enterFromClass: tw`scale-y-75 opacity-0`,
      enterActiveClass: tw`transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: tw`transition-opacity duration-100 ease-linear`,
      leaveToClass: tw`opacity-0`
    }
  },

  message: {
    root: tw`dark: rounded-md outline outline-1 p-secondary:bg-surface-100
      p-secondary:text-surface-600 p-secondary:outline-surface-200
      dark:p-secondary:bg-surface-800 dark:p-secondary:text-surface-300
      dark:p-secondary:outline-surface-700 p-contrast:bg-surface-900
      p-contrast:text-surface-50 p-contrast:outline-surface-950
      dark:p-contrast:bg-surface-0 dark:p-contrast:text-surface-950
      dark:p-contrast:outline-surface-100 p-success:bg-success-50/95
      p-success:text-success-600 p-success:outline-success-200
      dark:p-success:bg-success-500/15 dark:p-success:text-success-500
      dark:p-success:outline-success-700/35 p-info:bg-info-50/95 p-info:text-info-600
      p-info:outline-info-200 dark:p-info:bg-info-500/15 dark:p-info:text-info-500
      dark:p-info:outline-info-700/35 p-warn:bg-warn-50/95 p-warn:text-warn-600
      p-warn:outline-warn-200 dark:p-warn:bg-warn-500/15 dark:p-warn:text-warn-500
      dark:p-warn:outline-warn-700/35 p-error:bg-danger-50/95 p-error:text-danger-600
      p-error:outline-danger-200 dark:p-error:bg-danger-500/15
      dark:p-error:text-danger-500 dark:p-error:outline-danger-700/35
      p-outlined:bg-transparent p-outlined:outline p-outlined:outline-1
      p-secondary:p-outlined:text-surface-500
      p-secondary:p-outlined:outline-surface-500
      dark:p-secondary:p-outlined:text-surface-400
      dark:p-secondary:p-outlined:outline-surface-400
      p-contrast:p-outlined:text-surface-950 p-contrast:p-outlined:outline-surface-950
      dark:p-contrast:p-outlined:text-surface-0
      dark:p-contrast:p-outlined:outline-surface-0
      p-success:p-outlined:text-success-500 p-success:p-outlined:outline-success-500
      dark:p-success:p-outlined:text-success-600
      dark:p-success:p-outlined:outline-success-600 p-info:p-outlined:text-info-500
      p-info:p-outlined:outline-info-500 dark:p-info:p-outlined:text-info-600
      dark:p-info:p-outlined:outline-info-600 p-warn:p-outlined:text-warn-500
      p-warn:p-outlined:text-warn-600 p-warn:p-outlined:outline-warn-500
      dark:p-warn:p-outlined:outline-warn-600 p-error:p-outlined:text-danger-500
      p-error:p-outlined:outline-danger-500 dark:p-error:p-outlined:text-danger-600
      dark:p-error:p-outlined:outline-danger-600 p-simple:bg-transparent
      p-simple:outline-none p-secondary:p-simple:text-surface-500
      dark:p-secondary:p-simple:text-surface-400 p-contrast:p-simple:text-surface-950
      dark:p-contrast:p-simple:text-surface-0 p-success:p-simple:text-success-500
      dark:p-success:p-simple:text-success-600 p-info:p-simple:text-info-500
      dark:p-info:p-simple:text-info-600 p-warn:p-simple:text-warn-500
      dark:p-warn:p-simple:text-warn-600 p-error:p-simple:text-danger-500
      dark:p-error:p-simple:text-danger-600`,
    content: tw`flex h-full items-center gap-2 px-3 py-2 p-small:px-2.5 p-small:py-[0.375rem]
      p-large:px-3.5 p-large:py-2.5 p-simple:p-0`,
    icon: tw`h-[1.125rem] w-[1.125rem] flex-shrink-0 text-lg p-small:h-[0.875rem]
      p-small:w-[0.875rem] p-small:text-sm p-large:h-5 p-large:w-5 p-large:text-xl`,
    text: tw`text-base font-medium p-small:text-sm p-large:text-xl`,
    closeButton: tw`p:warn:hover:bg-warn-100 p:warn:focus-visible:outline-warn-600
      dark:p:warn:hover:bg-white/5 dark:p:warn:focus-visible:outline-warn-500 relative
      ms-auto flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center
      overflow-hidden rounded-full border-none bg-transparent p-0 text-inherit
      transition-colors duration-200 select-none focus-visible:outline
      focus-visible:outline-1 focus-visible:outline-offset-2
      p-secondary:hover:bg-surface-200 p-secondary:focus-visible:outline-surface-600
      dark:p-secondary:hover:bg-surface-700
      dark:p-secondary:focus-visible:outline-surface-300
      p-contrast:hover:bg-surface-800 p-contrast:focus-visible:outline-surface-50
      dark:p-contrast:hover:bg-surface-100
      dark:p-contrast:focus-visible:outline-surface-950 p-success:hover:bg-success-100
      p-success:focus-visible:outline-success-600 dark:p-success:hover:bg-white/5
      dark:p-success:focus-visible:outline-success-500 p-info:hover:bg-info-100
      p-info:focus-visible:outline-info-600 dark:p-info:hover:bg-white/5
      dark:p-info:focus-visible:outline-info-500 p-error:hover:bg-danger-100
      p-error:focus-visible:outline-danger-600 dark:p-error:hover:bg-white/5
      dark:p-error:focus-visible:outline-danger-500 p-outlined:hover:bg-transparent
      p-simple:hover:bg-transparent`,
    closeIcon: tw`h-4 w-4 text-base p-small:h-3.5 p-small:w-3.5 p-small:text-sm
      p-large:h-[1.125rem] p-large:w-[1.125rem] p-large:text-xl`,
    transition: {
      enterFromClass: tw`opacity-0`,
      enterActiveClass: tw`transition-opacity duration-300`,
      leaveFromClass: tw`max-h-40`,
      leaveActiveClass: tw`overflow-hidden transition-all duration-300 ease-in`,
      leaveToClass: tw`!m-0 max-h-0 opacity-0`
    }
  },

  panel: {
    root: tw`rounded-md border border-surface-200 bg-surface-0 text-surface-700
      dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0`,
    header: tw`flex items-center justify-between p-[1.125rem] p-toggleable:px-[1.125rem]
      p-toggleable:py-[0.375rem]`,
    title: tw`leading-none font-semibold`,
    headerActions: tw`flex items-center gap-1`,
    contentContainer: tw``,
    content: tw`px-[1.125rem] pt-0 pb-[1.125rem]`,
    footer: tw`px-[1.125rem] pt-0 pb-[1.125rem]`,
    transition: {
      enterFromClass: tw`max-h-0`,
      enterActiveClass: tw`overflow-hidden transition-[max-height] duration-1000
        ease-[cubic-bezier(0.42,0,0.58,1)]`,
      enterToClass: tw`max-h-[1000px]`,
      leaveFromClass: tw`max-h-[1000px]`,
      leaveActiveClass: tw`overflow-hidden transition-[max-height] duration-[450ms]
        ease-[cubic-bezier(0,1,0,1)]`,
      leaveToClass: tw`max-h-0`
    }
  },

  password: {
    root: tw`relative inline-flex p-fluid:flex`,
    pcInputText: {
      root: tw`appearance-none rounded-md border border-surface-300 bg-surface-0 px-3 py-2
        text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden
        transition-colors duration-200 placeholder:text-surface-500
        enabled:hover:border-surface-400 enabled:focus:border-primary
        disabled:bg-surface-200 disabled:text-surface-500 dark:border-surface-700
        dark:bg-surface-950 dark:text-surface-0 dark:placeholder:text-surface-400
        dark:enabled:hover:border-surface-600 dark:disabled:bg-surface-700
        dark:disabled:text-surface-400 p-invalid:border-danger-400
        p-invalid:placeholder:text-danger-600 dark:p-invalid:border-danger-300
        dark:p-invalid:placeholder:text-danger-400 p-small:px-[0.625rem]
        p-small:py-[0.375rem] p-small:text-sm p-large:px-[0.875rem]
        p-large:py-[0.625rem] p-large:text-lg p-fluid:w-full p-filled:bg-surface-50
        dark:p-filled:bg-surface-800 p-has-e-icon:pe-10`
    },
    overlay: tw`rounded-md border border-surface-200 bg-surface-0 p-3 text-surface-700
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]
      dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0
      p-portal-self:min-w-full`,
    content: tw`flex flex-col gap-2`,
    meter: tw`h-3 rounded-md bg-surface-200 dark:bg-surface-700`,
    meterLabel: tw`h-full w-0 rounded-md transition-[width] duration-1000 ease-in-out
      p-weak:bg-red-500 dark:p-weak:bg-red-400 p-medium:bg-amber-500
      dark:p-medium:bg-amber-400 p-strong:bg-green-500 dark:p-strong:bg-green-400`,
    meterText: tw``,
    transition: {
      enterFromClass: tw`scale-y-75 opacity-0`,
      enterActiveClass: tw`transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: tw`transition-opacity duration-100 ease-linear`,
      leaveToClass: tw`opacity-0`
    }
  },

  textarea: {
    root: tw`appearance-none rounded-md border border-surface-300 bg-surface-0 px-3 py-2
      text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden
      transition-colors duration-200 placeholder:text-surface-500
      enabled:hover:border-surface-400 enabled:focus:border-primary
      disabled:bg-surface-200 disabled:text-surface-500 dark:border-surface-700
      dark:bg-surface-950 dark:text-surface-0 dark:placeholder:text-surface-400
      dark:enabled:hover:border-surface-600 dark:disabled:bg-surface-700
      dark:disabled:text-surface-400 p-invalid:border-red-400
      p-invalid:placeholder:text-red-600 dark:p-invalid:border-red-300
      dark:p-invalid:placeholder:text-red-400 p-small:px-[0.625rem]
      p-small:py-[0.375rem] p-small:text-sm p-large:px-[0.875rem]
      p-large:py-[0.625rem] p-large:text-lg p-fluid:w-full p-filled:bg-surface-50
      dark:p-filled:bg-surface-800`
  },

  toast: {
    root: tw`w-96 rounded-md break-words whitespace-pre-line p-center:min-w-[20vw]
      p-center:-translate-x-1/2 p-center:-translate-y-1/2
      p-top-center:-translate-x-1/2 p-bottom-center:-translate-x-1/2`,
    message: tw`group mb-4 not-p-custom:rounded-md not-p-custom:border
      not-p-custom:backdrop-blur-sm dark:not-p-custom:backdrop-blur-md
      p-secondary:border-secondary-200 p-secondary:bg-secondary-50/95
      p-secondary:text-secondary-600 dark:p-secondary:border-secondary-700/35
      dark:p-secondary:bg-secondary-500/15 dark:p-secondary:text-secondary-500
      p-contrast:border-surface-950 p-contrast:bg-surface-900
      p-contrast:text-surface-50 dark:p-contrast:border-surface-100
      dark:p-contrast:bg-surface-0 dark:p-contrast:text-surface-950
      p-success:border-success-200 p-success:bg-success-50/95
      p-success:text-success-600 dark:p-success:border-success-700/35
      dark:p-success:bg-success-500/15 dark:p-success:text-success-500
      p-info:border-info-200 p-info:bg-info-50/95 p-info:text-info-600
      dark:p-info:border-info-700/35 dark:p-info:bg-info-500/15
      dark:p-info:text-info-500 p-warn:border-warn-200 p-warn:bg-warn-50/95
      p-warn:text-warn-600 dark:p-warn:border-warn-700/35 dark:p-warn:bg-warn-500/15
      dark:p-warn:text-warn-500 p-danger:border-danger-200 p-danger:bg-danger-50/95
      p-danger:text-danger-600 dark:p-danger:border-danger-700/35
      dark:p-danger:bg-danger-500/15 dark:p-danger:text-danger-500
      p-error:border-danger-200 p-error:bg-danger-50/95 p-error:text-danger-600
      dark:p-error:border-danger-700/35 dark:p-error:bg-danger-500/15
      dark:p-error:text-danger-500`,
    messageContent: tw`flex items-start gap-2 p-3`,
    messageIcon: tw`mt-1 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-lg`,
    messageText: tw`flex flex-auto flex-col gap-2`,
    summary: tw`text-base font-medium`,
    detail: tw`text-sm font-medium text-surface-700 dark:text-surface-0
      p-contrast:text-surface-0 dark:p-contrast:text-surface-950`,
    buttonContainer: tw``,
    closeButton: tw`relative -end-1/4 -mt-[25%] flex h-7 w-7 cursor-pointer items-center
      justify-center overflow-hidden rounded-full border-none bg-transparent p-0
      text-inherit transition-colors duration-200 select-none focus-visible:outline
      focus-visible:outline-1 focus-visible:outline-offset-2
      p-secondary:hover:bg-surface-200 p-secondary:focus-visible:outline-surface-600
      dark:p-secondary:hover:bg-surface-700
      dark:p-secondary:focus-visible:outline-surface-300
      p-contrast:hover:bg-surface-800 p-contrast:focus-visible:outline-surface-50
      dark:p-contrast:hover:bg-surface-100
      dark:p-contrast:focus-visible:outline-surface-950 p-success:hover:bg-success-100
      p-success:focus-visible:outline-success-600 dark:p-success:hover:bg-white/5
      dark:p-success:focus-visible:outline-success-500 p-info:hover:bg-info-100
      p-info:focus-visible:outline-info-600 dark:p-info:hover:bg-white/5
      dark:p-info:focus-visible:outline-info-500 p-warn:hover:bg-warn-100
      p-warn:focus-visible:outline-warn-600 dark:p-warn:hover:bg-white/5
      dark:p-warn:focus-visible:outline-warn-500 p-danger:hover:bg-danger-100
      p-danger:focus-visible:outline-danger-600 dark:p-danger:hover:bg-white/5
      dark:p-danger:focus-visible:outline-danger-500 p-error:hover:bg-danger-100
      p-error:focus-visible:outline-danger-600 dark:p-error:hover:bg-white/5
      dark:p-error:focus-visible:outline-danger-500`,
    closeIcon: tw`h-4 w-4 text-base`,
    transition: {
      enterFromClass: tw`translate-y-1/2 opacity-0`,
      enterActiveClass: tw`transition-all duration-500`,
      leaveFromClass: tw`max-h-[1000px]`,
      leaveActiveClass: tw`transition-all duration-500`,
      leaveToClass: tw`mb-0 max-h-0 overflow-hidden opacity-0`
    }
  },

  toolbar: {
    root: tw`bg-primary-0 flex flex-wrap items-center justify-between gap-2 rounded-md
      border-0 p-0 text-primary dark:bg-primary-900`,
    start: tw`flex items-center`,
    center: tw`flex items-center`,
    end: tw`flex items-center`
  }
}

_set(passthrough, "initialautocomplete", _cloneDeep(passthrough.autocomplete))
_set(passthrough, "combobox", _cloneDeep(passthrough.autocomplete))

export default passthrough
