export var clearStyles = function clearStyles(selector) {
  var selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyle);
};

var clearStyle = function clearStyle(selector) {
  var element = document.getElementById(selector);

  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
  }
};

export var addOutlineStyles = function addOutlineStyles(selector, css) {
  var existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    var style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};