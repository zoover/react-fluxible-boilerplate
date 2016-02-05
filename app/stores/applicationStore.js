import BaseStore from 'fluxible/addons/BaseStore';

export default class ApplicationStore extends BaseStore {
  static storeName = 'ApplicationStore';
  static handlers = {
    ['ASSETS_PATH_LOAD']: 'loadAssetsPath',
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.assetsPath = null;
  }

  loadAssetsPath(payload) {
    this.assetsPath = payload;
    this.emitChange();
  }

  getAssetsPath() {
    return this.assetsPath;
  }

  dehydrate() {
    return {
      assetsPath: this.assetsPath,
    };
  }

  rehydrate(state) {
    this.assetsPath = state.assetsPath;
  }
}
