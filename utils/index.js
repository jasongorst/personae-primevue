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

export const richTextAttributes = [ "description", "notes" ]

const names = [ "faeName", "mortalName" ]
const omitFromList = [ "house", "bannerhouse" ]

// for create/update, all detail and rich text attributes
export const apiAttributes = _concat(
  _map(detailAttributes, (attr) => ({ attribute: attr, type: "text" })),
  _map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

export const apiAttributesList = _map(apiAttributes, (attr) => attr.attribute)

// for characterList, all detail attributes except house and bannerhouse
export const listAttributes = _difference(detailAttributes, omitFromList)

// for datalist options in create/update, all detail attributes except names
export const optionsAttributes = _difference(detailAttributes, names)

// for filters, all list attributes except names
export const categoryAttributes = _difference(listAttributes, names)
