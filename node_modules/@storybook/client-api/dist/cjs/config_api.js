"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-underscore-dangle: 0 */
var ConfigApi = function ConfigApi(_ref) {
  var _this = this;

  var storyStore = _ref.storyStore;

  _classCallCheck(this, ConfigApi);

  this._storyStore = void 0;

  this.configure = function (loaders, module) {
    var showDeprecationWarning = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _this._storyStore.startConfiguring();

    try {
      loaders();

      _this._storyStore.clearError();
    } catch (err) {
      _this._storyStore.setError(err);
    }

    _this._storyStore.finishConfiguring();
  };

  this._storyStore = storyStore;
};

exports.default = ConfigApi;