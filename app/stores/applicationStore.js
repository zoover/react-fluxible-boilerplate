import BaseStore from 'fluxible/addons/BaseStore';
import {setLocale} from '../config/locale';

class ApplicationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.assetsPath = null;
    this.locale = null;
  }

  loadAssetsPath(payload) {
    this.assetsPath = payload;
    this.emitChange();
  }

  loadLocale(loc) {
    this.locale = loc;
    setLocale(loc);
  }

  getAssetsPath() {
    return this.assetsPath;
  }

  dehydrate() {
    return {
      assetsPath: this.assetsPath,
      locale: this.locale
    };
  }

  rehydrate(state) {
    this.assetsPath = state.assetsPath;
    this.loadLocale(state.locale);
  }
}

ApplicationStore.storeName = 'ApplicationStore';

ApplicationStore.handlers = {
  'ASSETS_PATH_LOAD': 'loadAssetsPath',
  'SET_LOCALE': 'loadLocale'
};

export default ApplicationStore;
