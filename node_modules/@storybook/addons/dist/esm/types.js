import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.values.js";
export var types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["TOOLEXTRA"] = "toolextra";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (types = {}));

export function isSupportedType(type) {
  return !!Object.values(types).find(function (typeVal) {
    return typeVal === type;
  });
}