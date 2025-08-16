export const detailAttributes = [
  "faeName",
  "mortalName",
  "player",
  "kith",
  "house",
  "bannerhouse",
  "seeming",
  "rank",
  "location",
  "position"
]

const names = [ "faeName", "mortalName" ]
const omitFromList = [ "house", "bannerhouse" ]

export const richTextAttributes = [ "description", "notes" ]

// for characterList, all detail attributes except house and bannerhouse
export const listAttributes = _difference(detailAttributes, omitFromList)

// for autocomplete, all detail attributes except names
export const optionsAttributes = _difference(detailAttributes, names)

// for filters, all list attributes except names
export const categoryAttributes = _difference(listAttributes, names)

// for create/edit
export const apiAttributes = _concat(
  _map(names, (attr) => ({ attribute: attr, type: "text" })),
  _map(optionsAttributes, (attr) => ({ attribute: attr, type: "autocomplete" })),
  _map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

export const apiAttributesList = _map(apiAttributes, "attribute")
