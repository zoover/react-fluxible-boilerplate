import React from 'react';
import Helmet from 'react-helmet';
import { expect } from 'chai';
import sinon from 'sinon';
import {ShallowComponent} from 'react-fluxible-utils';

import SampleListView from '../../../../../app/components/sampleList/SampleListView.jsx';
import Loader from '../../../../../app/components/_common/Loader.jsx';
import Title from '../../../../../app/components/_common/Title.jsx';
import SampleStore from '../../../../../app/stores/sampleStore';
import SampleList from '../../../../../app/components/sampleList/SampleList.jsx';

describe('SampleListView Component', function() {
  const sampleData = [
    {'id': 1, 'name': 'firstItem'},
    {'id': 2, 'name': 'secondItem'}
  ];

  let component = null;

  beforeEach(function() {
    component = new ShallowComponent(SampleListView).withProps({isLoading: false});
  });

  describe('connected component to stores', function() {
    beforeEach(function() {
      sinon.stub(SampleStore.prototype, 'getAll').returns(sampleData);
    });

    afterEach(function() {
      SampleStore.prototype.getAll.restore();
    });

    it('should map the store results to the correct props', function() {
      const sut = component.withStore(SampleStore).getSelf();

      expect(sut).to.have.deep.property('props.samples').that.deep.equals(sampleData);
    });
  });

  describe('composition', function() {
    it('should have Title and Loader component', function() {
      expect(component.get(Title)).to.be.ok;
      expect(component.get(Loader)).to.be.ok;
    });

    it('should pass loading property to Loader module', function() {
      const loader = component.withProps({isLoading: true}).get(Loader);
      expect(loader).to.have.deep.property('props.isLoading', true);

      const loader2 = component.withProps({isLoading: false}).get(Loader);
      expect(loader2).to.have.deep.property('props.isLoading', false);
    });

    it('should pass samples to List items props', function() {
      const sampleList = component.withProps({isLoading: false, samples: sampleData}).get(SampleList);

      expect(sampleList).to.be.ok;
      expect(sampleList).to.have.deep.property('props.samples').that.deep.equals(sampleData);
    });
  });
});