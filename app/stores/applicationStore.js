import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
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

ApplicationStore.storeName = 'ApplicationStore';

ApplicationStore.handlers = {
  'ASSETS_PATH_LOAD': 'loadAssetsPath',
};

export default ApplicationStore;
