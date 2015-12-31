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

  get(childComponent) {
    this.renderer.render(React.createElement(this.component, this.props), createMockComponentContext(this.componentContext));
    return ShallowTestUtils.findWithType(this.renderer.getRenderOutput(), childComponent);
  }

  getAll(childComponent) {
    this.renderer.render(React.createElement(this.component, this.props), createMockComponentContext(this.componentContext));
    return ShallowTestUtils.findAllWithType(this.renderer.getRenderOutput(), childComponent);
  }
}

module.exports = {
  MockDispatcher: MockDispatcher,
  ShallowComponent: ShallowComponent,
};
