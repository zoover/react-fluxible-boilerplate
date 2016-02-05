import BaseStore from 'fluxible/addons/BaseStore';

export default class SampleStore extends BaseStore {
  static storeName = 'SampleStore';
  static handlers = {
    ['SAMPLE_LIST_LOADED']: 'loadSamplesHandler',
    ['SAMPLE_ITEM_LOADED']: 'loadSampleHandler',
  };

  constructor(dispatcher) {
    super(dispatcher);
    this._setSamples([]);
  }

  loadSamplesHandler(payload) {
    this._addSamples(payload.samples);
    this.emitChange();
  }

  loadSampleHandler(payload) {
    this._addSamples([payload.sample]);
    this.emitChange();
  }

  getAll() {
    return Array.from(this.samples.values());
  }

  getById(id) {
    return this.samples.get(id);
  }

  dehydrate() {
    return {
      samples: this.getAll(),
    };
  }

  rehydrate(state) {
    this._setSamples(state.samples);
  }

  _setSamples(samplesArray) {
    this.samples = new Map();
    this._addSamples(samplesArray);
  }

  _addSamples(samplesArray) {
    samplesArray.map((sample) => {
      this.samples.set(sample.id, sample);
    });
  }
}
