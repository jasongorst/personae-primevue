export default {
  faeName: { type: "text", initialValue: "", showColumn: true },
  mortalName: { type: "text", initialValue: "", showColumn: true },
  player: { type: "autocomplete", initialValue: "", showColumn: true },
  kith: { type: "autocomplete", initialValue: "", showColumn: true },
  house: { type: "autocomplete", initialValue: "", showColumn: false },
  bannerhouse: { type: "autocomplete", initialValue: "", showColumn: false },
  seeming: { type: "autocomplete", initialValue: "", showColumn: true },
  rank: { type: "autocomplete", initialValue: "", showColumn: true },
  location: { type: "autocomplete", initialValue: "", showColumn: true },
  position: { type: "autocomplete", initialValue: "", showColumn: true },
  description: { type: "richText", initialValue: "", showColumn: false },
  notes: { type: "richText", initialValue: "", showColumn: false }
}
