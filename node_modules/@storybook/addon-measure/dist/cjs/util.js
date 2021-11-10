"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepElementFromPoint = void 0;

var deepElementFromPoint = function deepElementFromPoint(x, y) {
  var element = document.elementFromPoint(x, y);

  var crawlShadows = function crawlShadows(node) {
    if (node && node.shadowRoot) {
      var nestedElement = node.shadowRoot.elementFromPoint(x, y); // Nested node is same as the root one

      if (node.isEqualNode(nestedElement)) {
        return node;
      } // The nested node has shadow DOM too so continue crawling
      else if (nestedElement.shadowRoot) {
          return crawlShadows(nestedElement);
        } // No more shadow DOM
        else {
            return nestedElement;
          }
    }

    return node;
  };

  var shadowElement = crawlShadows(element);
  return shadowElement || element;
};

exports.deepElementFromPoint = deepElementFromPoint;