export let types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["TOOLEXTRA"] = "toolextra";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (types = {}));

export function isSupportedType(type) {
  return !!Object.values(types).find(typeVal => typeVal === type);
}