"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedType = isSupportedType;
exports.types = void 0;

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.values.js");

var types;
exports.types = types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["TOOLEXTRA"] = "toolextra";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (exports.types = types = {}));

function isSupportedType(type) {
  return !!Object.values(types).find(function (typeVal) {
    return typeVal === type;
  });
}