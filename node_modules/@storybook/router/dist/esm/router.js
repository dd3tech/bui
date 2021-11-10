function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import global from 'global';
import React from 'react';
import { Link, Location, navigate, LocationProvider } from '@reach/router';
import { ToggleVisibility } from './visibility';
import { queryFromString, parsePath, getMatch } from './utils';
var document = global.document;

var getBase = function getBase() {
  return "".concat(document.location.pathname, "?");
};

var queryNavigate = function queryNavigate(to, options) {
  return typeof to === 'number' ? navigate(to) : navigate("".concat(getBase(), "path=").concat(to), options);
}; // A component that will navigate to a new location/path when clicked


var QueryLink = function QueryLink(_ref) {
  var to = _ref.to,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["to", "children"]);

  return /*#__PURE__*/React.createElement(Link, _extends({
    to: "".concat(getBase(), "path=").concat(to)
  }, rest), children);
};

QueryLink.displayName = "QueryLink";
QueryLink.displayName = 'QueryLink'; // A render-prop component where children is called with a location
// and will be called whenever it changes when it changes

var QueryLocation = function QueryLocation(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement(Location, null, function (_ref3) {
    var location = _ref3.location;

    var _queryFromString = queryFromString(location.search),
        path = _queryFromString.path,
        singleStory = _queryFromString.singleStory;

    var _parsePath = parsePath(path),
        viewMode = _parsePath.viewMode,
        storyId = _parsePath.storyId,
        refId = _parsePath.refId;

    return children({
      path: path,
      location: location,
      navigate: queryNavigate,
      viewMode: viewMode,
      storyId: storyId,
      refId: refId,
      singleStory: singleStory === 'true'
    });
  });
};

QueryLocation.displayName = "QueryLocation";
QueryLocation.displayName = 'QueryLocation'; // A render-prop component for rendering when a certain path is hit.
// It's immensely similar to `Location` but it receives an addition data property: `match`.
// match has a truthy value when the path is hit.

var QueryMatch = function QueryMatch(_ref4) {
  var children = _ref4.children,
      targetPath = _ref4.path,
      _ref4$startsWith = _ref4.startsWith,
      startsWith = _ref4$startsWith === void 0 ? false : _ref4$startsWith;
  return /*#__PURE__*/React.createElement(QueryLocation, null, function (_ref5) {
    var urlPath = _ref5.path,
        rest = _objectWithoutProperties(_ref5, ["path"]);

    return children(Object.assign({
      match: getMatch(urlPath, targetPath, startsWith)
    }, rest));
  });
};

QueryMatch.displayName = "QueryMatch";
QueryMatch.displayName = 'QueryMatch'; // A component to conditionally render children based on matching a target path

var Route = function Route(_ref6) {
  var path = _ref6.path,
      children = _ref6.children,
      _ref6$startsWith = _ref6.startsWith,
      startsWith = _ref6$startsWith === void 0 ? false : _ref6$startsWith,
      _ref6$hideOnly = _ref6.hideOnly,
      hideOnly = _ref6$hideOnly === void 0 ? false : _ref6$hideOnly;
  return /*#__PURE__*/React.createElement(QueryMatch, {
    path: path,
    startsWith: startsWith
  }, function (_ref7) {
    var match = _ref7.match;

    if (hideOnly) {
      return /*#__PURE__*/React.createElement(ToggleVisibility, {
        hidden: !match
      }, children);
    }

    return match ? children : null;
  });
};

Route.displayName = "Route";
Route.displayName = 'Route';
export { QueryLink as Link };
export { QueryMatch as Match };
export { QueryLocation as Location };
export { Route };
export { queryNavigate as navigate };
export { LocationProvider };