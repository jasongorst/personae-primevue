const passthrough = {
  autocomplete: {
    root: `inline-flex p-fluid:flex`,
    pcInputText: {
      root: `appearance-none rounded-md outline-hidden
            bg-surface-0 dark:bg-surface-950
            p-filled:bg-surface-50 dark:p-filled:bg-surface-800
            text-surface-700 dark:text-surface-0
            placeholder:text-surface-500 dark:placeholder:text-surface-400
            border border-surface-300 dark:border-surface-700
            enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
            enabled:focus:border-primary
            disabled:bg-surface-200 disabled:text-surface-500
            dark:disabled:bg-surface-700 dark:disabled:text-surface-400
            p-invalid:border-red-400 dark:p-invalid:border-red-300
            p-invalid:placeholder:text-red-600 dark:p-invalid:placeholder:text-red-400
            px-3 py-2 p-fluid:w-full
            p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
            p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
            p-has-dropdown:flex-auto p-has-dropdown:w-[1%] p-has-dropdown:rounded-e-none
            transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
    },
    inputMultiple: `m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap
        px-3 py-1 not-p-empty:px-1 gap-1 text-surface-700 dark:text-surface-0 bg-surface-0 dark:bg-surface-950
        border border-surface-300 dark:border-surface-700 rounded-md p-has-dropdown:rounded-e-none w-full
        hover:border-surface-400 dark:hover:border-surface-600 p-focus:border-primary
        p-invalid:border-red-400 dark:p-invalid:border-red-300
        p-filled:bg-surface-50 dark:p-filled:bg-surface-800
        p-disabled:pointer-events-none p-disabled:bg-surface-200 p-disabled:text-surface-500 dark:p-disabled:bg-surface-700 dark:p-disabled:text-surface-400
        shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        transition-colors duration-200 outline-none`,
    chipItem: ``,
    pcChip: {
      root: `inline-flex items-center rounded-sm gap-2 px-3 py-1
            bg-surface-100 dark:bg-surface-800
            text-surface-800 dark:text-surface-0
            has-[img]:pt-1 has-[img]:pb-1
            p-focus:bg-surface-200 p-focus:text-surface-800 dark:p-focus:bg-surface-700 dark:p-focus:text-surface-0
            p-removable:pe-2`,
      image: `rounded-full w-8 h-8 -ms-2`,
      icon: `text-surface-800 dark:bg-surface-0 text-base w-4 h-4`,
      label: ``,
      removeIcon: `cursor-pointer text-base w-4 h-4 rounded-full
            text-surface-800 dark:text-surface-0
            focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary`
    },
    chipIcon: ``,
    inputChip: `flex-auto inline-flex py-1 max-w-30`,
    input: `border-none outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full text-inherit
        placeholder:text-surface-500 dark:placeholder:text-surface-400`,
    loader: `absolute top-1/2 -mt-2 end-3 p-has-dropdown:end-[3.25rem]`,
    dropdown: `cursor-pointer inline-flex items-center justify-center select-none overflow-hidden relative w-10 shrink-0 rounded-e-md
        border border-s-0 border-surface-300 dark:border-surface-700
        bg-surface-100 enabled:hover:bg-surface-200 enabled:active:bg-surface-300
        text-surface-600 enabled:hover:text-surface-700 enabled:hover:active:text-surface-800
        dark:bg-surface-800 dark:enabled:hover:bg-surface-700 dark:enabled:active:bg-surface-600
        dark:text-surface-300 dark:enabled:hover:text-surface-200 dark:enabled:active:text-surface-100
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
        transition-colors duration-200`,
    dropdownIcon: ``,
    overlay: `p-portal-self:min-w-full absolute top-0 left-0 rounded-md
        bg-surface-50 dark:bg-surface-950
        border border-surface-200 dark:border-surface-700
        text-surface-700 dark:text-surface-0
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    virtualScroller: ``,
    listContainer: `overflow-auto`,
    list: `m-0 p-1 list-none flex flex-col gap-[2px]`,
    optionGroup: `m-0 px-3 py-2 text-surface-500 dark:text-surface-400 font-semibold bg-transparent`,
    option: `cursor-pointer whitespace-nowrap relative overflow-hidden flex items-center px-3 py-2 rounded-sm
        text-surface-700 dark:text-surface-0 bg-transparent border-none
        p-focus:bg-surface-100 dark:p-focus:bg-surface-800 p-focus:text-surface-800 dark:p-focus:text-surface-0
        p-selected:bg-highlight p-focus:p-selected:bg-highlight-emphasis
        transition-colors duration-200`,
    emptyMessage: `px-3 py-2`,
    searchResultMessage: ``,
    selectedMessage: ``,
    transition: {
      enterFromClass: `opacity-0 scale-y-75`,
      enterActiveClass: `transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: `transition-opacity duration-100 ease-linear`,
      leaveToClass: `opacity-0`
    }
  },

  button: {
    root: `inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
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
        p-outlined:border-primary-200 enabled:hover:p-outlined:border-primary-300 enabled:active:p-outlined:border-primary-400
        p-outlined:text-primary enabled:hover:p-outlined:text-primary enabled:active:p-outlined:text-primary
        dark:p-outlined:bg-transparent dark:enabled:hover:p-outlined:bg-primary/5 dark:enabled:active:p-outlined:bg-primary/15
        dark:p-outlined:border-primary-700 dark:enabled:hover:p-outlined:border-primary-600 dark:enabled:active:p-outlined:border-primary-500
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
        p-danger:border-danger p-danger:enabled:hover:border-danger-emphasis p-danger:enabled:active:border-danger-emphasis-alt
    `,
    loadingIcon: `animate-spin`,
    icon: `p-right:order-1 p-bottom:order-2`,
    label: `font-medium p-icon-only:invisible p-icon-only:w-0
        p-small:text-sm p-large:text-[1.125rem]`,
    pcBadge: {
      root: `min-w-4 h-4 leading-4 bg-primary-contrast rounded-full text-primary text-xs font-bold`
    }
  },

  buttongroup: {
    root: `*:rounded-none *:first:rounded-s-md *:last:rounded-e-md
        *:focus-visible:relative *:focus-visible:z-10 *:not-last:border-r-0`
  },

  card: {
    root: `flex flex-col rounded-xl
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0
        shadow-md`,
    header: ``,
    body: `p-5 flex flex-col gap-2`,
    caption: `flex flex-col gap-2`,
    title: `font-medium text-xl`,
    subtitle: `text-surface-500 dark:text-surface-400`,
    content: ``,
    footer: ``
  },

  chip: {
    root: `inline-flex items-center rounded-2xl gap-1.5 px-3 py-2
        bg-surface-100 dark:bg-surface-800
        text-surface-800 dark:text-surface-0
        has-[img]:pt-1 has-[img]:pb-1
        p-removable:pe-2`,
    image: `rounded-full w-8 h-8 -ms-2`,
    icon: `text-surface-800 dark:text-surface-0 text-base w-4 h-4`
  },

  confirmdialog: {
    root: `max-h-[90%] max-w-screen rounded-xl
        border border-surface-200 dark:border-surface-700
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0 shadow-lg`,
    mask: `bg-black/50 fixed top-0 start-0 w-full h-full`,
    transition: {
      enterFromClass: `opacity-0 scale-75`,
      enterActiveClass: `transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: `transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]`,
      leaveToClass: `opacity-0 scale-75`
    }
  },

  datatable: {
    root: `relative p-flex-scrollable:flex p-flex-scrollable:flex-col p-flex-scrollable:h-full whitespace-nowrap text-sm`,
    tableContainer: `p-scrollable:relative p-flex-scrollable:flex p-flex-scrollable:flex-col p-flex-scrollable:flex-1 p-flex-scrollable:h-full`,
    header: `border-b border-surface-200 dark:border-surface-700
        bg-surface-50 dark:bg-surface-950
        text-surface-700 dark:text-surface-100`,
    table: `border-spacing-0 w-full border-separate`,
    thead: `p-scrollable:bg-surface-0 dark:p-scrollable:bg-surface-900 p-scrollable:top-0 p-scrollable:z-10`,
    tbody: `p-hoverable:*:hover:bg-primary/15 p-frozen:sticky p-frozen:z-10`,
    bodyRow: `bg-surface-0 odd:bg-surface-50 dark:bg-surface-900 dark:odd:bg-surface-950 text-surface-700 dark:text-surface-100 p-selectable:cursor-pointer p-selected:bg-highlight!`,
    tfoot: `p-scrollable:bg-surface-0 dark:p-scrollable:bg-surface-900 p-scrollable:bottom-0 p-scrollable:z-10`,
    footer: `py-3 px-4 border-b border-surface-200 dark:border-surface-700
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0`,
    mask: `bg-black/50 text-surface-200 absolute z-10 flex items-center justify-center w-full h-full backdrop-blu-`,
    column: {
      root: ``,
      headerCell: `relative group py-3 px-4 font-normal text-start transition-colors duration-200
            border-b border-surface-200 dark:border-surface-700
            p-sortable:cursor-pointer p-sortable:select-none
            p-sortable:focus-visible:outline p-sortable:focus-visible:outline-1
            p-sortable:focus-visible:-outline-offset-1 p-sortable:focus-visible:outline-primary
            p-sortable:hover:bg-surface-100 p-sortable:hover:text-surface-800
            dark:p-sortable:hover:bg-surface-800 dark:p-sortable:hover:text-surface-0
            p-frozen:sticky p-frozen:bg-surface-0 dark:p-frozen:bg-surface-900 p-frozen:z-10
        `,
      columnHeaderContent: `flex items-center gap-2`,
      columnTitle: `font-semibold`,
      bodyCell: `text-start py-3 px-4 border-b border-surface-200 dark:border-surface-800
            p-frozen:sticky p-frozen:bg-surface-0 dark:p-frozen:bg-surface-900`,
      bodyCellContent: ``,
      footerCell: `text-start py-3 px-4 border-b border-surface-200 dark:border-surface-800
            bg-surface-0 dark:bg-surface-900
            text-surface-700 dark:text-surface-0
            p-frozen:sticky p-frozen:bg-surface-0 dark:p-frozen:bg-surface-900`,
      columnFooter: `font-semibold`,
      columnResizer: `block absolute top-0 end-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent`,
      sort: ``,
      sortIcon: `text-surface-500 dark:text-surface-400 transition-colors duration-200
            group-p-sortable:not-group-p-sorted:group-hover:text-surface-600 dark:group-p-sortable:not-group-p-sorted:group-hover:text-surface-300
            group-p-sorted:bg-highlight`,
      pcSortBadge: {
        root: `bg-primary text-primary-contrast rounded-full min-w-6 h-6 inline-flex items-center justify-center text-xs font-bold`
      },
      pcHeaderCheckbox: {
        root: `relative inline-flex select-none w-5 h-5 align-bottom`,
        input: `peer cursor-pointer disabled:cursor-default appearance-none
                absolute start-0 top-0 w-full h-full m-0 p-0 opacity-0 z-10
                border border-transparent rounded-xs`,
        box: `flex justify-center items-center rounded-sm w-5 h-5
                border border-surface-300 dark:border-surface-700
                bg-surface-0 dark:bg-surface-950
                text-surface-700 dark:text-surface-0
                peer-enabled:peer-hover:border-surface-400 dark:peer-enabled:peer-hover:border-surface-600
                p-checked:border-primary p-checked:bg-primary p-checked:text-primary-contrast
                peer-enabled:peer-hover:p-checked:bg-primary-emphasis peer-enabled:peer-hover:p-checked:border-primary-emphasis
                peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-focus-visible:outline
                p-disabled:bg-surface-200 dark:p-disabled:bg-surface-400 p-disabled:border-surface-300 dark:p-disabled:border-surface-700 p-disabled:text-surface-700 dark:p-disabled:text-surface-400
                shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors duration-200`,
        icon: `text-sm w-[0.875rem] h-[0.875rem] transition-none`
      },
      pcRowRadiobutton: {
        root: `relative inline-flex select-none w-5 h-5`,
        input: `peer cursor-pointer disabled:cursor-default appearance-none absolute start-0 top-0 w-full h-full m-0 p-0 opacity-0 z-10
                border border-transparent rounded-full`,
        box: `flex justify-center items-center rounded-full
                border border-surface-300 dark:border-surface-700
                bg-surface-0 dark:bg-surface-950
                peer-enabled:peer-hover:border-surface-400 dark:peer-enabled:peer-hover:border-surface-600
                p-checked:border-primary p-checked:bg-primary
                peer-enabled:peer-hover:p-checked:bg-primary-emphasis peer-enabled:peer-hover:p-checked:border-primary-emphasis
                peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-focus-visible:outline
                p-filled:bg-surface-50 dark:p-filled:bg-surface-800
                p-invalid:border-danger-400 dark:p-invalid:border-danger-300
                p-disabled:bg-surface-200 dark:p-disabled:bg-surface-400 p-disabled:border-surface-300 dark:p-disabled:border-surface-700
                shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors duration-200
                w-5 h-5`,
        icon: `bg-transparent text-xs w-3 h-3 rounded-full
                transition-all duration-200 backface-hidden scale-[0.1]
                p-checked:bg-primary-contrast p-checked:visible p-checked:scale-100
                p-disabled:bg-surface-700 dark:p-disabled:bg-surface-400`
      },
      pcRowCheckbox: {
        root: `relative inline-flex select-none w-5 h-5 align-bottom`,
        input: `peer cursor-pointer disabled:cursor-default appearance-none
                absolute start-0 top-0 w-full h-full m-0 p-0 opacity-0 z-10
                border border-transparent rounded-xs`,
        box: `flex justify-center items-center rounded-sm w-5 h-5
                border border-surface-300 dark:border-surface-700
                bg-surface-0 dark:bg-surface-950
                text-surface-700 dark:text-surface-0
                peer-enabled:peer-hover:border-surface-400 dark:peer-enabled:peer-hover:border-surface-600
                p-checked:border-primary p-checked:bg-primary p-checked:text-primary-contrast
                peer-enabled:peer-hover:p-checked:bg-primary-emphasis peer-enabled:peer-hover:p-checked:border-primary-emphasis
                peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-focus-visible:outline
                p-disabled:bg-surface-200 dark:p-disabled:bg-surface-400 p-disabled:border-surface-300 dark:p-disabled:border-surface-700 p-disabled:text-surface-700 dark:p-disabled:text-surface-400
                shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors duration-200`,
        icon: `text-sm w-[0.875rem] h-[0.875rem] transition-none`
      },
      rowToggleButton: `inline-flex items-center justify-center overflow-hidden relative w-7 h-7 cursor-pointer select-none
            transition-colors duration-200 rounded-full border-none bg-transparent
            text-surface-500 enabled:hover:bg-surface-100 enabled:hover:text-surface-700
            dark:text-surface-400 dark:enabled:hover:bg-surface-800 dark:enabled:hover:text-surface-0
            focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
            p-selected:hover:bg-surface-0 dark:p-selected:hover:bg-surface-900 p-selected:hover:text-primary`,
      rowToggleIcon: ``,
      reorderableRowHandle: ``
    },
    loadingIcon: ``,
    pcPaginator: {
      paginatorContainer: `p-bottom:border-b border-surface-200 dark:border-surface-700`,
      root: `flex items-center justify-center flex-wrap py-2 px-4 rounded-md gap-1
            bg-surface-0 dark:bg-surface-900 text-surface-700 dark:text-surface-0`
    },
    columnResizeIndicator: `w-px absolute z-10 hidden bg-primary`,
    rowReorderIndicatorUp: `absolute hidden`,
    rowReorderIndicatorDown: `absolute hidden`
  },

  dialog: {
    root: `max-h-[90%] max-w-screen rounded-xl
          border border-surface-100 dark:border-surface-800
          bg-surface-200 dark:bg-surface-700
          text-surface-700 dark:text-surface-0 shadow-lg
          p-maximized:w-screen p-maximized:h-screen p-maximized:top-0 p-maximized:start-0p-maximized: max-h-full p-maximized:rounded-none`,
    header: `flex items-center justify-between shrink-0 p-5`,
    title: `font-semibold text-xl`,
    headerActions: `flex items-center gap-2`,
    content: `overflow-y-auto pt-0 px-5 pb-5 p-maximized:grow`,
    footer: `shrink-0 pt-0 px-5 pb-5 flex justify-end gap-2`,
    mask: `p-modal:bg-black/50 p-modal:fixed p-modal:top-0 p-modal:start-0 p-modal:w-full p-modal:h-full`,
    transition: {
      enterFromClass: `opacity-0 scale-75`,
      enterActiveClass: `transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: `transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]`,
      leaveToClass: `opacity-0 scale-75`
    }
  },

  inplace: {
    root: ``,
    display: `inline-block cursor-pointer border border-transparent px-3 py-2 rounded-md p-disabled:pointer-events-none
        hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-0
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary
        transition-colors duration-200`,
    content: `block`
  },

  inputtext: {
    root: `appearance-none rounded-md outline-hidden
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
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
  },

  listbox: {
    root: `group bg-surface-0 dark:bg-surface-950 text-surface-700 dark:text-surface-0
        border border-surface-300 dark:border-surface-700 rounded-md
        p-disabled:bg-surface-200 p-disabled:text-surface-500 dark:p-disabled:bg-surface-700 dark:p-disabled:text-surface-400 p-disabled:pointer-events-none
        p-invalid:border-danger-400 dark:p-invalid:border-danger-300
        shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] transition-colors duration-200`,
    header: `pt-2 pb-1 px-4`,
    pcFilterContainer: {
      root: `relative`
    },
    pcFilter: {
      root: `w-full appearance-none rounded-md outline-hidden
            bg-surface-0 dark:bg-surface-950
            text-surface-700 dark:text-surface-0
            placeholder:text-surface-500 dark:placeholder:text-surface-400
            border border-surface-300 dark:border-surface-700
            enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
            enabled:focus:border-primary
            disabled:bg-surface-200 disabled:text-surface-500
            dark:disabled:bg-surface-700 dark:disabled:text-surface-400
            ps-3 pe-10 py-2 p-fluid:w-full
            transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
    },
    pcFilterIconContainer: {
      root: `absolute top-1/2 -mt-2 leading-none end-3 z-1`
    },
    filterIcon: `text-surface-400`,
    listContainer: `overflow-auto`,
    virtualScroller: ``,
    list: `list-none m-0 p-1 outline-none flex flex-col gap-[2px]`,
    optionGroup: `m-0 px-3 py-2 text-surface-500 dark:text-surface-400 font-semibold`,
    option: `flex items-center cursor-pointer relative overflow-hidden px-3 py-2 border-none rounded-sm
        text-surface-700 dark:text-surface-0
        hover:not-p-selected:bg-surface-100 dark:hover:not-p-selected:bg-surface-800 hover:not-p-selected:text-surface-800 dark:hover:not-p-selected:text-surface-0
        p-focus:not-p-selected:bg-surface-100 dark:p-focus:not-p-selected:bg-surface-800 p-focus:not-p-selected:text-surface-800 dark:p-focus:not-p-selected:text-surface-0
        p-selected:bg-highlight p-selected:p-focus:bg-highlight-emphasis
        group-p-disabled:text-surface-500 dark:group-p-disabled:text-surface-400 group-p-disabled:pointer-events-none
        p-disabled:opacity-60 p-disabled:pointer-events-none
        transition-colors duration-200`,
    optionCheckIcon: ``,
    optionBlankIcon: ``,
    emptyMessage: `px-3 py-2`
  },

  menu: {
    root: `bg-primary-0 dark:bg-primary-900
        text-primary dark:text-primary
        rounded-md min-w-52
        p-popup:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    list: `mx-1 mb-1 list-none outline-none flex flex-col gap-0.5`,
    item: `p-disabled:opacity-60 p-disabled:pointer-events-none`,
    itemContent: `group transition-colors duration-200 rounded-sm
        p-focus:bg-primary-50 dark:p-focus:bg-primary/5
        p-focus:text-primary dark:p-focus:text-primary
        hover:bbg-primary-50 dark:hover:bg-primary/5
        hover:text-primary dark:hover:text-primary`,
    itemLink: `cursor-pointer flex items-center no-underline overflow-hidden relative text-inherit
        px-4 py-2 gap-2 select-none outline-none`,
    itemIcon: `text-primary dark:text-primary
        p-focus:text-primary dark:p-focus:text-primary
        group-hover:text-primary dark:group-hover:text-primary`,
    itemLabel: ``,
    submenuLabel: `bg-transparent px-4 py-2 text-primary dark:text-primary font-semibold`,
    separator: `border-t border-primary dark:border-primary`,
    transition: {
      enterFromClass: `opacity-0 scale-y-75`,
      enterActiveClass: `transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: `transition-opacity duration-100 ease-linear`,
      leaveToClass: `opacity-0`
    }
  },

  message: {
    root: `rounded-md outline outline-1
        p-outlined:bg-transparent p-outlined:outline p-outlined:outline-1
        p-simple:bg-transparent p-simple:outline-none
        p-info:bg-info-50/95 p-info:outline-info-200 p-info:text-info-600 dark:p-info:bg-info-500/15 dark:p-info:outline-info-700/35 dark:p-info:text-info-500
        p-info:p-outlined:text-info-500 p-info:p-outlined:outline-info-500 dark:p-info:p-outlined:text-info-600 dark:p-info:p-outlined:outline-info-600
        p-info:p-simple:text-info-500 dark:p-info:p-simple:text-info-600
        p-success:bg-success-50/95 p-success:outline-success-200 p-success:text-success-600 dark:p-success:bg-success-500/15 dark:p-success:outline-success-700/35 dark:p-success:text-success-500
        p-success:p-outlined:text-success-500 p-success:p-outlined:outline-success-500 dark:p-success:p-outlined:text-success-600 dark:p-success:p-outlined:outline-success-600
        p-success:p-simple:text-success-500 dark:p-success:p-simple:text-success-600
        p-warn:bg-warn-50/95 p-warn:outline-warn-200 p-warn:text-warn-600 dark:p-warn:bg-warn-500/15 dark:p-warn:outline-warn-700/35 dark:p-warn:text-warn-500
        p-warn:p-outlined:text-warn-500 p-warn:p-outlined:outline-warn-500 dark: p-warn:p-outlined:text-warn-600 dark:p-warn:p-outlined:outline-warn-600
        p-warn:p-simple:text-warn-500 dark:p-warn:p-simple:text-warn-600
        p-error:bg-danger-50/95 p-error:outline-danger-200 p-error:text-danger-600 dark:p-error:bg-danger-500/15 dark:p-error:outline-danger-700/35 dark:p-error:text-danger-500
        p-error:p-outlined:text-danger-500 p-error:p-outlined:outline-danger-500 dark:p-error:p-outlined:text-danger-600 dark:p-error:p-outlined:outline-danger-600
        p-error:p-simple:text-danger-500 dark:p-error:p-simple:text-danger-600
        p-secondary:bg-surface-100 p-secondary:outline-surface-200 p-secondary:text-surface-600 dark:p-secondary:bg-surface-800 dark:p-secondary:outline-surface-700 dark:p-secondary:text-surface-300
        p-secondary:p-outlined:text-surface-500 p-secondary:p-outlined:outline-surface-500 dark:p-secondary:p-outlined:text-surface-400 dark:p-secondary:p-outlined:outline-surface-400
        p-secondary:p-simple:text-surface-500 dark:p-secondary:p-simple:text-surface-400
        p-contrast:bg-surface-900 p-contrast:outline-surface-950 p-contrast:text-surface-50 dark:p-contrast:bg-surface-0 dark:p-contrast:outline-surface-100 dark:p-contrast:text-surface-950
        p-contrast:p-outlined:text-surface-950 p-contrast:p-outlined:outline-surface-950 dark:p-contrast:p-outlined:text-surface-0 dark:p-contrast:p-outlined:outline-surface-0
        p-contrast:p-simple:text-surface-950 dark:p-contrast:p-simple:text-surface-0`,
    content: `flex items-center
        p-simple:p-0
        px-3 py-2 gap-2 h-full
        p-small:px-2.5 p-small:py-[0.375rem]
        p-large:px-3.5 p-large:py-2.5`,
    icon: `flex-shrink-0 text-lg w-[1.125rem] h-[1.125rem]
        p-small:w-[0.875rem] p-small:h-[0.875rem] p-small:text-sm
        p-large:w-5 p-large:h-5 p-large:text-xl`,
    text: `text-base font-medium p-small:text-sm p-large:text-xl`,
    closeButton: `flex items-center justify-center flex-shrink-0 ms-auto overflow-hidden relative cursor-pointer select-none
        w-7 h-7 rounded-full bg-transparent transition-colors duration-200 text-inherit p-0 border-none
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
        p-info:hover:bg-info-100 p-info:focus-visible:outline-info-600 dark:p-info:hover:bg-white/5 dark:p-info:focus-visible:outline-info-500
        p-success:hover:bg-success-100 p-success:focus-visible:outline-success-600 dark:p-success:hover:bg-white/5 dark:p-success:focus-visible:outline-success-500
        p:warn:hover:bg-warn-100 p:warn:focus-visible:outline-warn-600 dark:p:warn:hover:bg-white/5 dark:p:warn:focus-visible:outline-warn-500
        p-error:hover:bg-danger-100 p-error:focus-visible:outline-danger-600 dark:p-error:hover:bg-white/5 dark:p-error:focus-visible:outline-danger-500
        p-secondary:hover:bg-surface-200 p-secondary:focus-visible:outline-surface-600 dark:p-secondary:hover:bg-surface-700 dark:p-secondary:focus-visible:outline-surface-300
        p-contrast:hover:bg-surface-800 p-contrast:focus-visible:outline-surface-50 dark:p-contrast:hover:bg-surface-100 dark:p-contrast:focus-visible:outline-surface-950
        p-outlined:hover:bg-transparent p-simple:hover:bg-transparent`,
    closeIcon: `w-4 h-4 text-base
        p-small:w-3.5 p-small:h-3.5 p-small:text-sm
        p-large:w-[1.125rem] p-large:h-[1.125rem] p-large:text-xl`,
    transition: {
      enterFromClass: `opacity-0`,
      enterActiveClass: `transition-opacity duration-300`,
      leaveFromClass: `max-h-40`,
      leaveActiveClass: `overflow-hidden transition-all duration-300 ease-in`,
      leaveToClass: `max-h-0 opacity-0 !m-0`
    }
  },

  panel: {
    root: `border border-surface-200 dark:border-surface-700 rounded-md
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0`,
    header: `flex justify-between items-center p-[1.125rem] p-toggleable:py-[0.375rem] p-toggleable:px-[1.125rem]`,
    title: `leading-none font-semibold`,
    headerActions: `flex items-center gap-1`,
    contentContainer: ``,
    content: `pt-0 pb-[1.125rem] px-[1.125rem] `,
    footer: `pt-0 pb-[1.125rem] px-[1.125rem] `,
    transition: {
      enterFromClass: `max-h-0`,
      enterActiveClass: `overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]`,
      enterToClass: `max-h-[1000px]`,
      leaveFromClass: `max-h-[1000px]`,
      leaveActiveClass: `overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]`,
      leaveToClass: `max-h-0`
    }
  },

  password: {
    root: `inline-flex relative p-fluid:flex`,
    pcInputText: {
      root: `appearance-none rounded-md outline-hidden
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
        px-3 py-2 p-fluid:w-full p-has-e-icon:pe-10
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
    },
    overlay: `p-3 rounded-md p-portal-self:min-w-full
        bg-surface-0 dark:bg-surface-900
        border border-surface-200 dark:border-surface-700
        text-surface-700 dark:text-surface-0
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    content: `flex flex-col gap-2`,
    meter: `h-3 bg-surface-200 dark:bg-surface-700 rounded-md`,
    meterLabel: `h-full w-0 transition-[width] duration-1000 ease-in-out rounded-md
        p-weak:bg-red-500 dark:p-weak:bg-red-400
        p-medium:bg-amber-500 dark:p-medium:bg-amber-400
        p-strong:bg-green-500 dark:p-strong:bg-green-400`,
    meterText: ``,
    transition: {
      enterFromClass: `opacity-0 scale-y-75`,
      enterActiveClass: `transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]`,
      leaveActiveClass: `transition-opacity duration-100 ease-linear`,
      leaveToClass: `opacity-0`
    }
  },

  textarea: {
    root: `appearance-none rounded-md outline-hidden
        bg-surface-0 dark:bg-surface-950
        p-filled:bg-surface-50 dark:p-filled:bg-surface-800
        text-surface-700 dark:text-surface-0
        placeholder:text-surface-500 dark:placeholder:text-surface-400
        border border-surface-300 dark:border-surface-700
        enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
        enabled:focus:border-primary
        disabled:bg-surface-200 disabled:text-surface-500
        dark:disabled:bg-surface-700 dark:disabled:text-surface-400
        p-invalid:border-red-400 dark:p-invalid:border-red-300
        p-invalid:placeholder:text-red-600 dark:p-invalid:placeholder:text-red-400
        px-3 py-2 p-fluid:w-full
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
  },

  toast: {
    root: `w-96 rounded-md whitespace-pre-line break-words
        p-top-center:-translate-x-1/2 p-bottom-center:-translate-x-1/2
        p-center:min-w-[20vw] p-center:-translate-x-1/2 p-center:-translate-y-1/2`,
    message: `group mb-4 not-p-custom:border not-p-custom:backdrop-blur-sm dark:not-p-custom:backdrop-blur-md not-p-custom:rounded-md
        p-info:bg-info-50/95 p-info:border-info-200 p-info:text-info-600 dark:p-info:bg-info-500/15 dark:p-info:border-info-700/35 dark:p-info:text-info-500
        p-success:bg-success-50/95 p-success:border-success-200 p-success:text-success-600 dark:p-success:bg-success-500/15 dark:p-success:border-success-700/35 dark:p-success:text-success-500
        p-warn:bg-warn-50/95 p-warn:border-warn-200 p-warn:text-warn-600 dark:p-warn:bg-warn-500/15 dark:p-warn:border-warn-700/35 dark:p-warn:text-warn-500
        p-error:bg-danger-50/95 p-error:border-danger-200 p-error:text-danger-600 dark:p-error:bg-danger-500/15 dark:p-error:border-danger-700/35 dark:p-error:text-danger-500
        p-danger:bg-danger-50/95 p-danger:border-danger-200 p-danger:text-danger-600 dark:p-danger:bg-danger-500/15 dark:p-danger:border-danger-700/35 dark:p-danger:text-danger-500
        p-secondary:bg-secondary-50/95 p-secondary:border-secondary-200 p-secondary:text-secondary-600 dark:p-secondary:bg-secondary-500/15 dark:p-secondary:border-secondary-700/35 dark:p-secondary:text-secondary-500
        p-contrast:bg-surface-900 p-contrast:border-surface-950 p-contrast:text-surface-50 dark:p-contrast:bg-surface-0 dark:p-contrast:border-surface-100 dark:p-contrast:text-surface-950`,
    messageContent: `flex items-start p-3 gap-2`,
    messageIcon: `flex-shrink-0 text-lg w-[1.125rem] h-[1.125rem] mt-1`,
    messageText: `flex-auto flex flex-col gap-2`,
    summary: `font-medium text-base`,
    detail: `font-medium text-sm text-surface-700 dark:text-surface-0
        p-contrast:text-surface-0 dark:p-contrast:text-surface-950`,
    buttonContainer: ``,
    closeButton: `flex items-center justify-center overflow-hidden relative cursor-pointer bg-transparent select-none
        transition-colors duration-200 text-inherit w-7 h-7 rounded-full -mt-[25%] -end-1/4 p-0 border-none
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
        p-info:hover:bg-info-100 p-info:focus-visible:outline-info-600 dark:p-info:hover:bg-white/5 dark:p-info:focus-visible:outline-info-500
        p-success:hover:bg-success-100 p-success:focus-visible:outline-success-600 dark:p-success:hover:bg-white/5 dark:p-success:focus-visible:outline-success-500
        p-warn:hover:bg-warn-100 p-warn:focus-visible:outline-warn-600 dark:p-warn:hover:bg-white/5 dark:p-warn:focus-visible:outline-warn-500
        p-error:hover:bg-danger-100 p-error:focus-visible:outline-danger-600 dark:p-error:hover:bg-white/5 dark:p-error:focus-visible:outline-danger-500
        p-danger:hover:bg-danger-100 p-danger:focus-visible:outline-danger-600 dark:p-danger:hover:bg-white/5 dark:p-danger:focus-visible:outline-danger-500
        p-secondary:hover:bg-surface-200 p-secondary:focus-visible:outline-surface-600 dark:p-secondary:hover:bg-surface-700 dark:p-secondary:focus-visible:outline-surface-300
        p-contrast:hover:bg-surface-800 p-contrast:focus-visible:outline-surface-50 dark:p-contrast:hover:bg-surface-100 dark:p-contrast:focus-visible:outline-surface-950`,
    closeIcon: `text-base w-4 h-4`,
    transition: {
      enterFromClass: `opacity-0 translate-y-1/2`,
      enterActiveClass: `transition-all duration-500`,
      leaveFromClass: `max-h-[1000px]`,
      leaveActiveClass: `transition-all duration-500`,
      leaveToClass: `max-h-0 opacity-0 mb-0 overflow-hidden`
    }
  },

  toolbar: {
    root: `flex items-center justify-between flex-wrap p-3 gap-2
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0
        border border-surface-200 dark:border-surface-700 rounded-md`,
    start: `flex items-center`,
    center: `flex items-center`,
    end: `flex items-center`
  }
}

_set(passthrough, "initialautocomplete", _cloneDeep(passthrough.autocomplete))
_set(passthrough, "combobox", _cloneDeep(passthrough.autocomplete))

export default passthrough
