/* eslint no-underscore-dangle: 0 */
export default class ConfigApi {
  constructor({
    storyStore
  }) {
    this._storyStore = void 0;

    this.configure = (loaders, module, showDeprecationWarning = true) => {
      this._storyStore.startConfiguring();

      try {
        loaders();

        this._storyStore.clearError();
      } catch (err) {
        this._storyStore.setError(err);
      }

      this._storyStore.finishConfiguring();
    };

    this._storyStore = storyStore;
  }

}