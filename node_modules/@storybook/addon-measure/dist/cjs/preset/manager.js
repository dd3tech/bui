"use strict";

var _addons = require("@storybook/addons");

var _constants = require("../constants");

var _Tool = require("../Tool");

// Register the addon
_addons.addons.register(_constants.ADDON_ID, function () {
  // Register the tool
  _addons.addons.add(_constants.TOOL_ID, {
    type: _addons.types.TOOL,
    title: "Measure",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === "story";
    },
    render: _Tool.Tool
  });
});