import React from 'react';
import {createMockActionContext} from 'fluxible/utils';
import { createMockComponentContext } from 'fluxible/utils';
import { createRenderer } from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';

class MockDispatcher {

  constructor(store) {
    this.actionContext = createMockActionContext({
      stores: [store]
    });
    this.store = this.actionContext.getStore(store);
  }

  getStore() {
    return this.store;
  }

  dispatch(actionName, payload) {
    this.actionContext.dispatch(actionName, payload);
  }
}

class ShallowComponent {
  constructor(component) {
    this.component = component;
    this.renderer = createRenderer();
    this.props = {};
    this.componentContext = {};
  }

  withProps(props) {
    this.props = props;
    return this;
  }

  withStore(store) {
    const stores = [store];
    this.componentContext = {stores};
    return this;
  }

  getSelf(){
    const bla = this.componentContext.stores ? this.component : (this.component.original ? this.component.original : this.component);
    this.renderer.render(React.createElement(bla, this.props), createMockComponentContext(this.componentContext));
    return this.renderer.getRenderOutput();
  }

  get(childComponent) {
    return ShallowTestUtils.findWithType(this.getSelf(), childComponent);
  }

  getAll(childComponent) {
    return ShallowTestUtils.findAllWithType(this.getSelf(), childComponent);
  }
}

module.exports = {
  MockDispatcher: MockDispatcher,
  ShallowComponent: ShallowComponent,
};
