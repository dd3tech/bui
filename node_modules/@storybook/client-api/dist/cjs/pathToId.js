"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathToId;

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.exec.js");

function pathToId(path) {
  var match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error("Invalid path '".concat(path, "',  must start with '/story/'"));
  }

  return match[1];
}